import os
import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf_report(assessment_data: dict, pre_image_path: str = None, post_image_path: str = None) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a')
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#64748b')
    )

    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=10,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#334155')
    )

    elements = []

    # Title & Subtitle Header
    elements.append(Paragraph("DAMAGESCOPE &bull; SATELLITE DISASTER ASSESSMENT REPORT", title_style))
    job_id = assessment_data.get("job_id", "N/A")
    created_at = assessment_data.get("created_at", "N/A")
    elements.append(Paragraph(f"JOB ID: {job_id} &nbsp;|&nbsp; TIMESTAMP: {created_at} UTC &nbsp;|&nbsp; STATUS: COMPLETED", subtitle_style))
    elements.append(Spacer(1, 10))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0f172a'), spaceBefore=2, spaceAfter=12))

    # Risk Zone Banner
    risk_level = assessment_data.get("risk_level", "LOW")
    recs = assessment_data.get("recommendations", {})
    zone_title = recs.get("title", f"{risk_level} Risk Zone")
    priority = recs.get("priority", "Standard Directives")

    badge_color_hex = "#ef4444" if risk_level == "CRITICAL" else ("#f97316" if risk_level == "MODERATE" else "#22c55e")
    bg_color_hex = "#fef2f2" if risk_level == "CRITICAL" else ("#fff7ed" if risk_level == "MODERATE" else "#f0fdf4")

    risk_banner_style = ParagraphStyle(
        'RiskBanner',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor(badge_color_hex)
    )

    priority_style = ParagraphStyle(
        'PriorityText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#1e293b')
    )

    banner_content = [
        [Paragraph(f"RISK ZONE EVALUATION: {zone_title.upper()}", risk_banner_style)],
        [Paragraph(f"PRIMARY ACTION FOCUS: <b>{priority}</b>", priority_style)]
    ]

    banner_table = Table(banner_content, colWidths=[540])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor(bg_color_hex)),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor(badge_color_hex)),
        ('PADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 2),
    ]))
    elements.append(banner_table)
    elements.append(Spacer(1, 14))

    # Summary Statistics Table
    summary = assessment_data.get("summary", {})
    elements.append(Paragraph("Building Damage Severity Summary", h2_style))

    summary_data = [
        ["Category", "Building Count", "Percentage"],
        ["No Damage", str(summary.get("no_damage", 0)), f"{summary.get('pct_no_damage', 0.0):.1f}%"],
        ["Minor Damage", str(summary.get("minor_damage", 0)), f"{summary.get('pct_minor_damage', 0.0):.1f}%"],
        ["Major Damage", str(summary.get("major_damage", 0)), f"{summary.get('pct_major_damage', 0.0):.1f}%"],
        ["Destroyed", str(summary.get("destroyed", 0)), f"{summary.get('pct_destroyed', 0.0):.1f}%"],
        ["Total Detected", str(summary.get("total_buildings", 0)), "100.0%"]
    ]

    summary_table = Table(summary_data, colWidths=[180, 180, 180])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9.5),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#f1f5f9')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor('#f8fafc')]),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(summary_table)
    elements.append(Spacer(1, 14))

    # Recommended Recovery Actions
    elements.append(Paragraph("Automated Disaster Recovery Action Directives", h2_style))
    rec_list = recs.get("recommendations", [])
    
    rec_rows = []
    for idx, rec_text in enumerate(rec_list, start=1):
        item_para = Paragraph(f"<b>Directive #{idx}:</b> {rec_text}", body_style)
        rec_rows.append([item_para])

    if rec_rows:
        rec_table = Table(rec_rows, colWidths=[540])
        rec_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor('#94a3b8')),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('PADDING', (0, 0), (-1, -1), 8),
        ]))
        elements.append(rec_table)

    elements.append(Spacer(1, 14))

    # Pre and Post Image Previews (if available on local path)
    if pre_image_path and os.path.exists(pre_image_path) and post_image_path and os.path.exists(post_image_path):
        elements.append(Paragraph("Satellite Imagery Comparison", h2_style))
        try:
            img_w, img_h = 250, 250
            rl_pre = RLImage(pre_image_path, width=img_w, height=img_h)
            rl_post = RLImage(post_image_path, width=img_w, height=img_h)
            
            img_table = Table([
                [Paragraph("<b>Pre-Disaster Satellite Image</b>", subtitle_style), Paragraph("<b>Post-Disaster Satellite Image</b>", subtitle_style)],
                [rl_pre, rl_post]
            ], colWidths=[270, 270])

            img_table.setStyle(TableStyle([
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('PADDING', (0, 0), (-1, -1), 4),
            ]))
            elements.append(img_table)
        except Exception as e:
            elements.append(Paragraph(f"Satellite thumbnail rendering note: {str(e)}", body_style))

    # Footer note
    elements.append(Spacer(1, 16))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=4, spaceAfter=8))
    footer_text = "DamageScope Building Damage Assessment System &bull; Generated locally via ONNX Runtime Engine & ReportLab PDF"
    elements.append(Paragraph(footer_text, ParagraphStyle('Footer', parent=styles['Normal'], fontName='Helvetica', fontSize=8, textColor=colors.HexColor('#94a3b8'), alignment=1)))

    doc.build(elements)
    pdf_data = buffer.getvalue()
    buffer.close()
    return pdf_data

from typing import Dict, Any

def compute_recommendations(summary_stats: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates building damage summary statistics against strict disaster recovery rules.
    
    summary_stats keys:
      - total_buildings (int)
      - no_damage (int)
      - minor_damage (int)
      - major_damage (int)
      - destroyed (int)
      - pct_destroyed (float, 0-100)
      - pct_major_plus_destroyed (float, 0-100)
      - pct_minor_plus_major (float, 0-100)
    """
    pct_destroyed = summary_stats.get("pct_destroyed", 0.0)
    pct_major_plus_destroyed = summary_stats.get("pct_major_plus_destroyed", 0.0)
    pct_minor_plus_major = summary_stats.get("pct_minor_plus_major", 0.0)
    total_buildings = summary_stats.get("total_buildings", 0)

    if total_buildings == 0:
        return {
            "priority": "No Buildings Detected",
            "zone_level": "LOW",
            "title": "Low Risk Green Zone - Clear Area",
            "recommendations": [
                "No building structures identified in satellite image pair.",
                "Conduct manual aerial survey if structures were anticipated.",
                "Log assessment as clear terrain."
            ]
        }

    # Rule 1: Critical Red Zone (>30% Destroyed or >50% Major+Destroyed)
    if pct_destroyed > 30.0 or pct_major_plus_destroyed > 50.0:
        return {
            "priority": "Emergency Search & Rescue, Structural Safety Lockdown",
            "zone_level": "CRITICAL",
            "title": "Critical Red Zone - High Severity Impact",
            "recommendations": [
                "Immediate structural engineering clearance required before re-entry.",
                "Set up temporary emergency shelters within 2km of impacted zone.",
                "Deploy heavy machinery for debris removal along primary access routes."
            ]
        }

    # Rule 2: Moderate Orange Zone (15–30% Destroyed or >30% Minor/Major)
    if (15.0 <= pct_destroyed <= 30.0) or (pct_minor_plus_major > 30.0):
        return {
            "priority": "Targeted Infrastructure Repair & Stabilization",
            "zone_level": "MODERATE",
            "title": "Moderate Orange Zone - Intermediate Severity Impact",
            "recommendations": [
                "Prioritize utility restoration (power, water, gas grid isolation).",
                "Dispatch mobile inspection units for minor-damage habitability checks.",
                "Distribute tarp and temporary roofing kits to affected households."
            ]
        }

    # Rule 3: Low Risk Green Zone (<15% Destroyed)
    return {
        "priority": "Standard Recovery & Documentation",
        "zone_level": "LOW",
        "title": "Low Risk Green Zone - Minimal Structural Impact",
        "recommendations": [
            "Conduct localized structural checks on flagged minor-damage buildings.",
            "Allow resident re-entry under general caution.",
            "Begin insurance claims processing and municipal assessment logging."
        ]
    }

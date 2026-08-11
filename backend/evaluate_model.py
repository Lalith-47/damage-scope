import os
import sys
import json
import numpy as np

# Ensure backend directory is in python path
sys.path.insert(0, os.path.dirname(__file__))

from inference import ModelInferenceEngine, DAMAGE_CLASSES
from main import generate_sample_satellite_pair

def run_evaluation():
    models_dir = os.path.join(os.path.dirname(__file__), "models")
    engine = ModelInferenceEngine.get_instance(models_dir)

    pre_path, post_path = generate_sample_satellite_pair()
    buildings, summary_counts = engine.run_assessment(pre_path, post_path)

    y_true = []
    y_pred = []

    for idx, b in enumerate(buildings):
        pattern = idx % 4
        if pattern == 0:
            gt = "no-damage"
        elif pattern == 1:
            gt = "minor-damage"
        elif pattern == 2:
            gt = "major-damage"
        else:
            gt = "destroyed"

        pred = b["damage_class"]
        y_true.append(gt)
        y_pred.append(pred)

    n_classes = len(DAMAGE_CLASSES)
    cm = np.zeros((n_classes, n_classes), dtype=int)
    class_to_idx = {cls_name: i for i, cls_name in enumerate(DAMAGE_CLASSES)}

    for t, p in zip(y_true, y_pred):
        cm[class_to_idx[t]][class_to_idx[p]] += 1

    cm_norm = np.zeros((n_classes, n_classes), dtype=float)
    for i in range(n_classes):
        row_sum = np.sum(cm[i, :])
        if row_sum > 0:
            cm_norm[i, :] = np.round((cm[i, :] / row_sum) * 100.0, 2)

    # --- RAW OUTPUT ---
    print("CLASSES:")
    print(DAMAGE_CLASSES)

    print("\nRAW CONFUSION MATRIX - COUNT (NumPy Array):")
    print(repr(cm))

    print("\nRAW CONFUSION MATRIX - COUNT (List of Lists):")
    print(cm.tolist())

    print("\nRAW NORMALIZED CONFUSION MATRIX - PERCENTAGE (NumPy Array %):")
    print(repr(cm_norm))

    print("\nRAW NORMALIZED CONFUSION MATRIX - PERCENTAGE (List of Lists %):")
    print(cm_norm.tolist())

    print("\nRAW Y_TRUE:")
    print(y_true)

    print("\nRAW Y_PRED:")
    print(y_pred)

    print("\nRAW JSON DICT:")
    raw_dict = {
        "classes": DAMAGE_CLASSES,
        "confusion_matrix_count": cm.tolist(),
        "confusion_matrix_normalized_pct": cm_norm.tolist(),
        "y_true": y_true,
        "y_pred": y_pred
    }
    print(json.dumps(raw_dict, indent=2))

if __name__ == "__main__":
    run_evaluation()

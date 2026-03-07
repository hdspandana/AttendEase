from flask import Flask, jsonify, request
from flask_cors import CORS
import math
import os

app = Flask(__name__)

allowed_origin = os.environ.get("ALLOWED_ORIGIN", "*")
CORS(app, resources={r"/calculate": {"origins": allowed_origin}})

@app.route("/")
def health():
    return jsonify({"status": "AttendEase API is running"}), 200

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()

    try:
        attended  = int(data.get("attended", 0))
        absent    = int(data.get("absent", 0))
        total_sem = int(data.get("totalSem", 0))
        target    = float(data.get("target", 75))
    except (ValueError, TypeError):
        return jsonify({"error": "Please enter valid numbers."}), 400

    if attended < 0 or absent < 0 or total_sem <= 0 or target < 0 or target > 100:
        return jsonify({"error": "Please enter valid numbers."}), 400

    conducted = attended + absent

    if conducted == 0:
        return jsonify({"error": "No classes conducted yet."}), 400

    if conducted > total_sem:
        return jsonify({"error": "Conducted classes cannot exceed semester total."}), 400

    remaining         = total_sem - conducted
    current_percent   = (attended / conducted) * 100
    required_attended = math.ceil((target / 100) * total_sem)
    max_possible      = attended + remaining

    if max_possible < required_attended:
        return jsonify({
            "error"      : f"❗Even if you attend all {remaining}, you cannot reach {target}%.😢",
            "conducted"  : conducted,
            "remaining"  : remaining,
            "unreachable": True
        }), 200

    need_to_attend = max(0, required_attended - attended)
    max_bunk       = max(0, remaining - need_to_attend)

    return jsonify({
        "conducted"       : conducted,
        "attended"        : attended,
        "absent"          : absent,
        "remaining"       : remaining,
        "currentPercent"  : round(current_percent, 2),
        "requiredAttended": required_attended,
        "needToAttend"    : need_to_attend,
        "maxBunk"         : max_bunk,
        "target"          : target
    }), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(debug=False, host="0.0.0.0", port=port)

document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous results/errors
    document.getElementById('result').style.display = 'none';
    document.getElementById('error').style.display = 'none';

    // Get auto-incremented ID
    let recordId = localStorage.getItem('recordId');
    if (!recordId) {
        recordId = 1;
    } else {
        recordId = parseInt(recordId) + 1;
    }
    localStorage.setItem('recordId', recordId);

    // Get form data
    const formData = new FormData(document.getElementById('predictionForm'));
    
    // Convert form data to JSON object with auto-incremented ID
    const data = {
        id: recordId,
        road_type: formData.get('road_type'),
        num_lanes: parseInt(formData.get('num_lanes')),
        curvature: parseFloat(formData.get('curvature')),
        speed_limit: parseInt(formData.get('speed_limit')),
        lighting: formData.get('lighting'),
        weather: formData.get('weather'),
        road_signs_present: formData.get('road_signs_present') === 'true',
        public_road: formData.get('public_road') === 'true',
        time_of_day: formData.get('time_of_day'),
        holiday: formData.get('holiday') === 'true',
        school_season: formData.get('school_season') === 'true',
        num_reported_accidents: parseInt(formData.get('num_reported_accidents'))
    };

    try {
        // Send POST request to backend
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Prediction  Result:",result);

        // Check if there's an error
        if (result.error) {
            showError(result.error);
        } else {
            // Display prediction result
            displayResult(result);
        }
    } catch (error) {
        showError('Failed to connect to backend: ' + error.message);
    }
});

function displayResult(result) {
    const riskScore = (result.accident_risk * 100).toFixed(2);
    document.getElementById('riskScore').textContent = riskScore + '%';
    document.getElementById('riskValue').textContent = result.accident_risk.toFixed(4);
    
    const riskLevelElement = document.getElementById('riskLevel');
    const riskLevel = result.risk_level.toLowerCase().split(' ')[0];
    
    riskLevelElement.textContent = result.risk_level;
    riskLevelElement.className = 'risk-level ' + riskLevel;
    
    document.getElementById('result').style.display = 'block';
}

function showError(errorMessage) {
    document.getElementById('errorMessage').textContent = errorMessage;
    document.getElementById('error').style.display = 'block';
}

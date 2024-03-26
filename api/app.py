from flask import Flask, request
from flasgger import Swagger
from PIL import Image
import pytesseract
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
Swagger(app)

logging.basicConfig(filename='ocr.log', level=logging.ERROR, format='%(asctime)s %(levelname)s %(message)s')

@app.route('/ocr', methods=['POST'])
def ocr():
    """
    Perform OCR on an image and return extracted text as a TXT file
    ---
    parameters:
      - name: file
        in: formData
        type: file
        required: true
        description: The image file to perform OCR on
    responses:
      200:
        description: Text extracted from the image
        schema:
          properties:
            text:
              type: string
      400:
        description: Bad request if the file is not provided or is not an image
      500:
        description: Internal server error if an error occurs during OCR processing
    """
    try:
        if 'file' not in request.files:
            return {'message': 'No file found'}, 400
        
        file = request.files['file']
        if file.filename == '':
            return {'message': 'No selected file'}, 400
        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            return {'message': 'Invalid file format'}, 400

        img = Image.open(file)
        text = pytesseract.image_to_string(img)

        return {'text': text}, 200
    
    except Exception as e:
        logging.exception("Exception occurred during OCR processing")
        return {'message': str(e)}, 500


if __name__ == '__main__':
    app.run(debug=True)

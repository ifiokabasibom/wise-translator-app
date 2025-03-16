## Overview
WISE Translator App is a simple web application that allows users to convert spoken words into text, translate the text into a selected language, and play back the translated text using text-to-speech technology.

## Features
- Speech recognition for converting spoken words into text.
- Language translation using the MyMemory API.
- Text-to-speech functionality to read the translated text aloud.
- Supports multiple languages including English, French, Spanish, German, and Chinese.

## Technologies Used
- **HTML** for structuring the web page.
- **CSS** for styling the user interface.
- **JavaScript** for handling speech recognition, translation, and text-to-speech.
- **Web Speech API** for speech recognition and text-to-speech functionality.
- **MyMemory API** for text translation.

## How to Use
1. **Select an input language** from the dropdown menu.
2. **Click on 'Start Speaking'** and speak into your microphone.
3. The spoken words will appear in the "Spoken text" area.
4. **Select an output language** from the dropdown menu.
5. The app will automatically translate the text into the selected output language.
6. Click **'🔊 Speak Translation'** to hear the translated text.


## API Usage
The app uses the MyMemory translation API:
- **Endpoint:** `https://api.mymemory.translated.net/get`
- **Parameters:**
  - `q`: The text to translate.
  - `langpair`: Language pair (e.g., `en|fr` for English to French).
- **Example Request:**
  ```sh
  https://api.mymemory.translated.net/get?q=Hello&langpair=en|fr
  ```

## Limitations
- Speech recognition is only supported on browsers that implement the Web Speech API (e.g., Google Chrome, and Microsoft Edge).
- Translation may fail if the API request limit is reached.

## Future Improvements
- Add support for additional languages.
- Implement offline translation using a local dictionary.
- Enhance UI with better styling and animations.

## Author
Developed by Wisdom Eno Abasibom.

## License
This project is open-source and free to use.

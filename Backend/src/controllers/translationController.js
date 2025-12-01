import axios from "axios";
import Translation from '../models/translationModel.js';

const translatedText = async (text, targetLang) => {
    try {
        // Using MyMemory Translation API (Free, no API key required)
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
        
        const res = await axios.get(url, {
            timeout: 10000 // 10 second timeout
        });

        console.log(`Translation response for ${targetLang}:`, res.data);
        
        // Check if translation exists in response
        if (res.data && res.data.responseData && res.data.responseData.translatedText) {
            const translatedText = res.data.responseData.translatedText;
            console.log(`✅ Successfully translated to ${targetLang}: ${translatedText}`);
            return translatedText;
        }
        
        // Fallback if no translation in response
        console.warn(`⚠️ No translation found for ${targetLang}, using original text`);
        return text;
        
    } catch (error) {
        console.error(`❌ Translation API error for ${targetLang}:`, error.message);
        // Return original text as fallback
        return text;
    }
}

export const addTranslation = async (req, res) =>{
    try {
        const { key, englishText} = req.body;

        console.log('Adding translation for:', key, englishText);

        // Translate to multiple languages
        const hindi = await translatedText(englishText, "hi");
        const spanish = await translatedText(englishText, "es");
        const french = await translatedText(englishText, "fr");

        console.log('Translations:', { hindi, spanish, french });

        const newTranslation = await Translation.create({
            key,
            translations: {
                en: englishText,
                hi: hindi,
                es: spanish,
                fr: french,
            },
        });

        res.status(201).json({
            message : "Translation added successfully",
            data : newTranslation,
        })

    }catch (err){
        console.error('Add translation error:', err);
        res.status(500).json({message : "error in adding translation", error: err.message})
    }
}

export const searchTranslations = async (req, res) =>{
    try{
        const { query } = req.query;

        const result = await Translation.find ({ key : {$regex : query || '', $options: "i"}, })

        res.json(result);
    } catch (err){
        res.status(500).json({message : "error in searching translation", err})

    }
}

export const updateTranslation = async (req, res) => {
    try {
        const { id } = req.params;
        const { translations } = req.body;

        const updatedTranslation = await Translation.findByIdAndUpdate( id, {translations}, {new : true})

        res.json({
            message : "Translation Updated successfully.",
            data : updatedTranslation,
        })
    } catch (err) {
        res.status(500).json({message : "error in updating translation", err})

    }
}
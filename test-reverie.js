const ReverieClient = require("reverie-client");

const reverieClient = new ReverieClient({
  apiKey: "a09f4cbde5b2932a9f4b5760fb1cd2efcff1661b",
  appId: "com.venkatasaiprasadp",
});

async function translateText() {
  try {
    const translation = await reverieClient.translate({
      text: "Hey there, how are you doing?",
      src_lang: "en",
      tgt_lang: "hi",
    });
    console.log("Translation result:", translation);
  } catch (error) {
    console.error("Translation error:", error);
  }
}

translateText();

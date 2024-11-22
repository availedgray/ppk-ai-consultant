const OpenAI = require('openai');

class ConsultantController {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    async generateConsultation(req, res) {
        try {
            const { petType, question } = req.body;

            if (!petType || !question) {
                return res.status(400).json({
                    success: false,
                    error: 'Please provide breed and questions'
                });
            }

            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional veterinarian specializing in cats. You only answer questions related to cats' health, behavior, and care."
                    },
                    {
                        role: "user",
                        content: `Breed: ${petType}\nQuestion: ${question}\nPlease provide professional suggestions, including cause analysis, solutions and preventive measures.`
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7,
            });

            const answer = completion.choices[0].message.content;

            res.json({
                success: true,
                data: { answer }
            });
        } catch (error) {
            console.error('AI Consultation Error:', error);
            res.status(500).json({
                success: false,
                error: 'Server error, please try again later'
            });
        }
    }
}

module.exports = new ConsultantController();
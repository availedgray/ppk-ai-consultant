# PawPawPicks-ai-consultant
Implement a new AI consultant feature into my pet project website. In development, to be integrated into the site.

## Initial Commit
The first version of the AI Consultant provides a basic feature that allows users to ask a question about their pet and get AI reponse.
- **Default settings**: The current version is limited to handling only cat-related problems
- **Response format**: Provides up to 1000 tokens as a response

## to Be Developed
1. Redo the entire Pawpawpick website to be more scalable and optimized. Transition from using native HTML to using frameworks. Develop a databases

2. Integrate the AI consultant function with the original Pawpawpick database. Be able to check existing pet consultation questions and answers stored in the database. Use JavaScript's Map object to create a cache that avoids redundant data fetching, reducing the number of API calls

3. Format AI responses into a proper article format, server-side rendering with markdown parser (marked or showdown)

4. Add input fields such as cat weight, age, medical history, and more (Will increase the API call cost, so it will not be considered for development in the immediate future). Add question prompts, provide relevant information avoid invalid AI query

5. Improve API response speed and consider implementing real-time API

## Tech Stack
HTML <br>
CSS <br>
JavaScript (For interactive elements)<br>
Node.js with Express (Backend framework for handling requests)<br>
OpenAI API<br>
dotenv<br>
rate-limiter-flexible (To manage and limit the rate of API calls)<br>



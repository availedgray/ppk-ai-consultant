class AIPetConsultant {
    constructor() {
      this.apiEndpoint = 'http://localhost:3000/api/pet-consultant';
      this.initializeUI();
      this.bindEvents();
    }

    initializeUI() {
        // creat form
        const template = `
          <div class="pet-consultant-container">
            <div>
              <h3 class="consultant-title">Find expert advice from our AI Consultant</h3>
              <p class="consultant-description">Get tailored solutions to your pet-related concerns with our AI-powered insights. <br>Enter your question and consult!</p>
            </div>
            <form id="petConsultantForm" class="consultant-form">
              <div class="form-group">
                <label for="petType">Select your cat's breed</label>
                <select id="petType" name="petType" required>
                  <option value="">please select...</option>
                  <option value="dog">Ragdoll</option>
                  <option value="cat">Maine Coon</option>
                  <option value="rabbit">Siamese</option>
                  <option value="hamster">British Shorthair</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="question">Your question:</label>
                <textarea 
                  id="question" 
                  name="question" 
                  rows="4" 
                  placeholder="Please describe your question..."
                  required
                ></textarea>
                <label>For example: Why does my cat have soft stools?</label>
              </div>
              
              <button type="submit" class="submit-btn">
                <span class="btn-text">Ask the AI Consultant</span>
                <span class="loading-spinner hidden"></span>
              </button>
            </form>
            
            <div id="consultationResult" class="result-container hidden">
              <div class="result-header">
                <h3>AI Consultant Recommendations:</h3>
                <button class="copy-btn" title="Copy content">
                  <i class="copy-icon"></i>
                </button>
              </div>
              <div class="result-content"></div>
            </div>
            <p class="consultant-model">Powered by OpenAI GPT 3.5</p>
          </div>
        `;

        document.getElementById('pet-consultant-app').innerHTML = template;
  }

  bindEvents() {
    const form = document.getElementById('petConsultantForm');
    const copyBtn = document.querySelector('.copy-btn');
    
    form.addEventListener('submit', (e) => this.handleSubmit(e));
    copyBtn.addEventListener('click', () => this.copyResult());
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const btnText = submitBtn.querySelector('.btn-text');
    
    const petType = form.petType.value;
    const question = form.question.value;

    submitBtn.disabled = true;
    loadingSpinner.classList.remove('hidden');
    btnText.textContent = 'Consulting...';

    try {
        const response = await this.getAIConsultation(petType, question);

        // debugging
        console.log('API Response:', response);
        
        this.displayResult(response);
      } catch (error) {
        this.displayError(error);
      } finally {
        submitBtn.disabled = false;
        loadingSpinner.classList.add('hidden');
        btnText.textContent = 'Ask the AI Consultant';
      }
    }

    async getAIConsultation(petType, question) {
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            petType,
            question
          })
        });

        if (!response.ok) {
            throw new Error('Requested failure, please try again');
          }

          return response.json();
  }

  displayResult(response) {
    const resultContainer = document.getElementById('consultationResult');
    const resultContent = resultContainer.querySelector('.result-content');
    
    resultContent.innerHTML = response.data.answer;
    resultContainer.classList.remove('hidden');

    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

displayError(error) {
    alert(error.message || 'Error, please try again');
  }

  copyResult() {
    const resultContent = document.querySelector('.result-content').textContent;
    navigator.clipboard.writeText(resultContent)
      .then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.title = 'Copied';
        setTimeout(() => copyBtn.title = 'Copy content', 2000);
      })
      .catch(() => alert('Error'));
  }
}
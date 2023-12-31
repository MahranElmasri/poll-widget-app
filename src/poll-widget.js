class PollWidget extends HTMLElement {
  constructor() {
    super();
    // Initialize handleVote
    this.handleVote = this.handleVote.bind(this);

    // Shadow DOM
    this.attachShadow({ mode: 'open' });

    // Initial state
    this.state = {
      question: '',
      options: [],
      selectedOption: null,
      votes: [],
    };
  }

  connectedCallback() {
    this.parseAttributes();
    // Check if the poll has been already added to the page
    const isPollAdded = this.isPollAdded();

    if (!isPollAdded) {
      // Restore the votes from local storage
      const storedVotes = localStorage.getItem(
        `pollVotes_${this.state.question}`
      );

      if (storedVotes) {
        const parsedVotes = JSON.parse(storedVotes);
        if (
          Array.isArray(parsedVotes) &&
          parsedVotes.length === this.state.options.length
        ) {
          this.setState({ votes: parsedVotes });
        }
      }

      this.render();
      this.addEventListeners();

      // Mark the poll as added to the page
      this.markPollAsAdded();
    } else {
      console.warn(
        `Poll with question "${this.state.question}" is already added to the page.`
      );
      // Remove the duplicate widget
      this.remove();
    }
  }

  isPollAdded() {
    window.addedPolls = window.addedPolls || {};

    // Check if the same poll has been already added to the page
    if (window.addedPolls[this.state.question]) return true;

    return false;
  }

  markPollAsAdded() {
    // Make the poll as added to the page
    window.addedPolls = window.addedPolls || {};
    window.addedPolls[this.state.question] = true;
  }

  parseAttributes() {
    const question = this.getAttribute('question');
    const options = JSON.parse(this.getAttribute('options'));

    if (question && Array.isArray(options)) {
      this.setState({
        question,
        options,
        votes: Array(options.length).fill(0),
      });
    } else {
      console.error('Invalid or missing attributes for PollWidget.');
    }
  }

  addEventListeners() {
    this.shadowRoot.addEventListener('click', (event) => {
      const optionIndex = parseInt(event.target.dataset.index);
      if (!isNaN(optionIndex)) {
        this.handleVote(optionIndex);
      }
    });
  }

  handleVote(optionIndex) {
    const newVotes = [...this.state.votes];
    newVotes[optionIndex]++;

    localStorage.setItem(
      `pollVotes_${this.state.question}`,
      JSON.stringify({ votes: newVotes })
    );

    this.setState({ votes: newVotes, selectedOption: optionIndex });
    this.render();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    const { question, options, selectedOption, votes } = this.state;

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="src/poll-widget.css">
      <div class="poll-container">
        <h2>${question}</h2>
        <div class="options-container">
          ${options
            .map((option, index) => {
              const colorClass =
                index === 0 ? 'green' : index === 1 ? 'blue' : 'red';
              const optionVotes = votes[index] || 0;
              const totalVotes = votes.reduce((acc, curr) => acc + curr, 0);
              const votePercentage =
                totalVotes === 0 ? 0 : (optionVotes / totalVotes) * 100;

              return `
                <div
                  class="option ${selectedOption === index ? 'selected' : ''}"
                  data-index="${index}"
                >
                  ${option}
                  <div class="progress-container">
                    <div class="progress-bar ${colorClass}" style="width: ${votePercentage.toFixed(
                2
              )}%"></div>
                  </div>
                  <span class="percentage">${votePercentage.toFixed(1)}%</span>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('poll-widget', PollWidget);

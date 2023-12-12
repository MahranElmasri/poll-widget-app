import { html, fixture, expect } from '@open-wc/testing';
import '../src/poll-widget';

describe('PollWidget', () => {
  it('renders with default values', async () => {
    const el = await fixture(html`
      <poll-widget
        question="Test"
        options='["Option 1", "Option 2"]'
      ></poll-widget>
    `);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should handle user vote and update results', async () => {
    const el = await fixture(
      html`<poll-widget
        question="Test Question 2"
        options='["Option A", "Option B"]'
      ></poll-widget>`
    );

    // Simulate user vote
    el.shadowRoot.querySelector('[data-index="0"]').click();

    // Verify that the state is updated
    expect(el.state.selectedOption).to.equal(0);
    expect(el.state.votes[0]).to.equal(1);
  });

  it('should prevent displaying the same poll twice on the same page', async () => {
    // Create two instances of the PollWidget with the same question
    const poll1 = await fixture(
      html`<poll-widget
        question="Test Question"
        options='["Option A", "Option B"]'
      ></poll-widget>`
    );
    const poll2 = await fixture(
      html`<poll-widget
        question="Test Question"
        options='["Option A", "Option B"]'
      ></poll-widget>`
    );

    // Ensure that the second instance is not added to the DOM
    expect(poll1).to.not.be.null;
    expect(poll2).to.be.null;
  });

  it('should displaying defferent polls on the same page', async () => {
    const poll1 = await fixture(
      html`<poll-widget
        question="Test 1"
        options='["Option A", "Option B"]'
      ></poll-widget>`
    );
    const poll2 = await fixture(
      html`<poll-widget
        question="Test 2"
        options='["Op A", "Op B"]'
      ></poll-widget>`
    );

    expect(poll1.isConnected).to.be.true;
    expect(poll2.isConnected).to.be.true;
  });
});

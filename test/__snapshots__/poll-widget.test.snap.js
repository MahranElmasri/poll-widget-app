/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["PollWidget renders with default values"] = 
`<div class="poll-container">
  <h2>
  </h2>
  <div class="options-container">
  </div>
</div>
`;
/* end snapshot PollWidget renders with default values */

snapshots["PollWidget renders with provided attributes"] = 
`<div class="poll-container">
  <h2>
    Test Question
  </h2>
  <div class="options-container">
    <div
      class="option"
      data-index="0"
    >
      Option 1
      <div class="progress-container">
        <div
          class="progress-bar"
          style="width: 0.00%"
        >
        </div>
      </div>
      <span class="percentage">
        0.0%
      </span>
    </div>
    <div
      class="option"
      data-index="1"
    >
      Option 2
      <div class="progress-container">
        <div
          class="progress-bar"
          style="width: 0.00%"
        >
        </div>
      </div>
      <span class="percentage">
        0.0%
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot PollWidget renders with provided attributes */

snapshots["PollWidget handles votes and updates UI"] = 
`<div class="poll-container">
  <h2>
    Test Question
  </h2>
  <div class="options-container">
    <div
      class="option selected"
      data-index="0"
    >
      Option 1
      <div class="progress-container">
        <div
          class="progress-bar"
          style="width: 100.00%"
        >
        </div>
      </div>
      <span class="percentage">
        100.0%
      </span>
    </div>
    <div
      class="option"
      data-index="1"
    >
      Option 2
      <div class="progress-container">
        <div
          class="progress-bar"
          style="width: 0.00%"
        >
        </div>
      </div>
      <span class="percentage">
        0.0%
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot PollWidget handles votes and updates UI */


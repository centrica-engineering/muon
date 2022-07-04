module.exports = (content, { heading }) => {
  return `
    <details class="section" open>
    <summary class="section-heading"><h2>${heading}</h2></summary>

    ${content}

    </details>
  `;
};
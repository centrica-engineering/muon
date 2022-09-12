module.exports = ({ compName }) => {
  const url = `https://main--61dd6b0ee46d9a004ac27873.chromatic.com/?path=/story/muon-${compName}`;
  
  return `
    <div class="storybook-embed">
        <iframe
          src="${url}&nav=0"
          title=Muon ${compName}
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
        <p>View example on <a href="${url}" target="_blank">Storybook</a></p>
      </div>
  `;
};
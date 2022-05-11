import { html, unsafeStatic } from 'lit/static-html.js';
export default (name, el) => {
  const prefix = process.env.MUON_PREFIX;
  const element = `${prefix}-${name}`;

  if (!customElements.get(element)) {
    customElements.define(element, el);
  }

  const elName = name ? name : element;
  const defaultValues = {
    title: element,
    component: elName,
    argTypes: {
      registry: {
        table: {
          disable: true
        }
      },
      renderOptions: {
        table: {
          disable: true
        }
      },
      shadowRootOptions: {
        table: {
          disable: true
        }
      },
      scopedElements: {
        table: {
          disable: true
        }
      },
      slottedStyles: {
        table: {
          disable: true
        }
      }
    }
  };

  const getTagEl = () => {
    return unsafeStatic(element);
  };

  const dynamicArgs = (args) => {
    const dArgs = args && Object.keys(args).map((arg) => {
      if (arg === 'text') {
        return undefined;
      }

      if (typeof args[arg] === 'boolean') {
        return args[arg] === true ? arg : undefined;
      } else if (typeof args[arg] === 'number') {
        return `${arg}=${args[arg]}`;
      } else if (Array.isArray(args[arg])) {
        const arrayArgs = args[arg].map((arrayVal) => {
          return `"${arrayVal}"`;
        });
        return `${arg}=[${arrayArgs}]`;
      } else {
        return `${arg}="${args[arg]}"`;
      }
    }).filter((arg) => arg).join(' ');

    return unsafeStatic(dArgs);
  };

  const template = (args, inner) => {
    const tag = getTagEl();
    const dArgs = dynamicArgs(args);

    return html`<${tag} ${dArgs}>${inner ? unsafeStatic(inner(args)) : ''}</${tag}>`;
  };

  return {
    defaultValues,
    element,
    elName,
    template,
    getTagEl,
    dynamicArgs
  };

};

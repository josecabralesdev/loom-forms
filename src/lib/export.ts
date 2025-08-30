import type { FormStructure } from './types';

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToJson(form: FormStructure) {
  const jsonString = JSON.stringify(form, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  triggerDownload(blob, `${form.title.replace(/\s+/g, '_').toLowerCase()}.json`);
}

function generateFieldHtml(field: FormStructure['fields'][0]): string {
  const requiredAttr = field.required ? 'required' : '';
  const label = `<label for="${field.name}" class="form-label">${field.label}${field.required ? ' *' : ''}</label>`;
  
  switch (field.type) {
    case 'textarea':
      return `
        <div class="form-group">
          ${label}
          <textarea id="${field.name}" name="${field.name}" placeholder="${field.placeholder || ''}" ${requiredAttr}></textarea>
        </div>`;
    case 'select':
        const options = field.options?.map(opt => `<option value="${opt}">${opt}</option>`).join('') || '';
        return `
        <div class="form-group">
            ${label}
            <select id="${field.name}" name="${field.name}" ${requiredAttr}>
            ${options}
            </select>
        </div>`;
    case 'rating':
        return `
        <div class="form-group">
            ${label}
            <div class="rating-group">
                ${[1,2,3,4,5].map(val => `
                <input type="radio" id="${field.name}-${val}" name="${field.name}" value="${val}" ${requiredAttr ? 'required' : ''}>
                <label for="${field.name}-${val}">&#9733;</label>
                `).join('')}
            </div>
        </div>
        `
    default:
      return `
        <div class="form-group">
          ${label}
          <input type="${field.type}" id="${field.name}" name="${field.name}" placeholder="${field.placeholder || ''}" ${requiredAttr}>
        </div>`;
  }
}

export function exportToHtml(form: FormStructure) {
  const fieldsHtml = form.fields.map(generateFieldHtml).join('\n');
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${form.title}</title>
    <style>
        body { font-family: sans-serif; background-color: #f9fafb; color: #111827; margin: 0; padding: 2rem; }
        .form-container { max-width: 600px; margin: auto; background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
        h1 { font-size: 1.5rem; font-weight: 600; }
        p { color: #6b7280; }
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        input, textarea, select { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; box-sizing: border-box; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #A78BFA; box-shadow: 0 0 0 2px #c4b5fd; }
        .submit-btn { width: 100%; background-color: #A78BFA; color: #111827; padding: 0.75rem; border: none; border-radius: 0.375rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; }
        .submit-btn:hover { background-color: #818CF8; }
        .rating-group { display: flex; flex-direction: row-reverse; justify-content: flex-end; }
        .rating-group input { display: none; }
        .rating-group label { font-size: 2rem; color: #d1d5db; cursor: pointer; transition: color 0.2s; }
        .rating-group input:checked ~ label, .rating-group label:hover, .rating-group label:hover ~ label { color: #facc15; }
    </style>
</head>
<body>
    <div class="form-container">
        <form>
            <h1>${form.title}</h1>
            <p>${form.description}</p>
            ${fieldsHtml}
            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </div>
</body>
</html>
  `;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  triggerDownload(blob, `${form.title.replace(/\s+/g, '_').toLowerCase()}.html`);
}

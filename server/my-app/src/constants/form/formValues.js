const logo = 'logo';
const header = 'header';
const subHeader = 'subHeader';

const formValues = {
  header: {
    id: header,
    label: 'Header',
    type: 'text',
    name: header,
    description: 'First header'
  },
  subHeader: {
    id: subHeader,
    label: 'SubHeader',
    type: 'text',
    name: subHeader,
    description: 'Second header'
  },
  logo: {
    id: logo,
    label: 'Logo',
    type: 'file',
    name: logo,
    description: 'Logo'
  }
};

export const formValuesCreateArticle = {
  logo: formValues.logo,
  header: formValues.header,
  subHeader: formValues.subHeader
};

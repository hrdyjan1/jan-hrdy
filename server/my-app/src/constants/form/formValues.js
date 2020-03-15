const logo = 'logo';
const header = 'header';
const subHeader = 'subHeader';

const formValues = {
  header: {
    id: header,
    label: 'Header',
    type: 'text',
    name: header,
    description: 'First header',
    icon: { name: 'heading' }
  },
  subHeader: {
    id: subHeader,
    label: 'SubHeader',
    type: 'text',
    name: subHeader,
    description: 'Second header',
    icon: { name: 'heading', size: 'small' }
  },
  logo: {
    id: logo,
    label: 'Logo',
    type: 'file',
    name: logo,
    description: 'Search',
    icon: { name: 'search' }
  }
};

export const formValuesCreateArticle = {
  logo: formValues.logo,
  header: formValues.header,
  subHeader: formValues.subHeader
};

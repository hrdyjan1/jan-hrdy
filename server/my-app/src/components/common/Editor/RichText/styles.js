import styled from '@emotion/styled';

export const palletOfColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'black',
  'gray',
  'white'
];

// Defines style visible only in editor
export const customStyleMap = {
  RED: {
    color: 'red'
  },
  ORANGE: {
    color: 'orange'
  },
  YELLOW: {
    color: 'yellow'
  },
  GREEN: {
    color: 'green'
  },
  BLUE: {
    color: 'blue'
  },
  PURPLE: {
    color: 'purple'
  },
  BLACK: {
    color: 'black'
  },
  GRAY: {
    color: 'gray'
  },
  WHITE: {
    color: 'white'
  },
  TITLE: {
    fontSize: '1.5em'
  }
};

export const RTEContainer = styled.div`
  border: 1px solid #f2f2f2;
  padding: 1em;
  cursor: text;
`;

export const ToolbarButton = styled.button`
  border: 1px solid #f2f2f2;
  padding: 1em;
  background: white;
  border: 0;
  outline: 0;
  cursor: pointer;
  border: 1px solid #f2f2f2;
`;

export const ColorsContainer = styled.div`
  background: white;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(33, 33, 33, 0.3);
`;

export const Palette = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 150px;
  background: snow;
`;
export const ColorDrop = styled.div`
  border: 1px solid black;
  display: inline-block;
  padding: 1em;
  margin: 1em;
  margin-right: 0;
  height: 0.5em;
  width: 0.5em;
  border-radius: 3px;
  cursor: pointer;
  ${({ color }) => {
    if (typeof color === 'string') color = color.toUpperCase();
    if (customStyleMap[color]) {
      return `background: ${customStyleMap[color].color};`;
    } else {
      return `display: none;`;
    }
  }}
`;

export const NavBar = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const NavDivider = styled.div`
  width: 1px;
  background: #f2f2f2;
  min-height: 1em;
  margin: 0.5em 0.5em;
  display: inline-block;
`;

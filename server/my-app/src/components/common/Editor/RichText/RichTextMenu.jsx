import React, { useState } from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatTitle from '@material-ui/icons/FormatSize';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatColor from '@material-ui/icons/Palette';
import Image from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';

import { NavBar, NavDivider, ColorsContainer, Palette, ColorDrop, palletOfColors } from './styles';
import { NavInputButton } from './components';

function NavButton({ children, onClick }) {
  const onMouseDown = e => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <IconButton onClick={onClick} onMouseDown={onMouseDown}>
      {children}
    </IconButton>
  );
}

const RichTextMenu = React.memo(({ setStyle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isColoPalletOpen = Boolean(anchorEl);
  const id = isColoPalletOpen ? 'simple-popover' : undefined;

  const onBoldClick = () => setStyle('BOLD');
  const onTitleClick = () => setStyle('TITLE');
  const onItalicClick = () => setStyle('ITALIC');
  const onUnderlineClick = () => setStyle('UNDERLINE');

  const onColorClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const onImageSelect = () => {
    console.log('image clicked');
  };

  const onColorSelect = color => {
    setStyle(color.toUpperCase());
    setAnchorEl(null);
  };

  const closePalletColor = () => {
    setAnchorEl(null);
  };

  return (
    <NavBar>
      <NavButton onClick={onTitleClick}>
        <FormatTitle />
      </NavButton>

      <NavDivider />
      <NavButton onClick={onBoldClick}>
        <FormatBold />
      </NavButton>
      <NavButton onClick={onItalicClick}>
        <FormatItalic />
      </NavButton>
      <NavButton onClick={onUnderlineClick}>
        <FormatUnderlined />
      </NavButton>

      <NavDivider />
      <NavButton aria-describedby={id} onClick={onColorClick}>
        <FormatColor />
      </NavButton>

      <NavInputButton onClick={onImageSelect}>
        <Image />
      </NavInputButton>
      {/* <div>
        <input
          onChange={onImageClick}
          accept='image/*'
          style={{ display: 'none' }}
          id='upload-photo'
          name='upload-photo'
          type='file'
        />
        <label htmlFor='upload-photo' style={{ cursor: 'inherit', lineHeight: 0 }}>
          <IconButton variant='raised' component='span'>
            <Image />
          </IconButton>
        </label>
      </div> */}

      {/* <NavButton>
        <InputContainer handleClick={onImageClick}>
          <Image />
        </InputContainer>
      </NavButton> */}

      <NavButton>
        <Image />
      </NavButton>

      <Popper id={id} open={isColoPalletOpen} anchorEl={anchorEl} onClose={closePalletColor}>
        <ClickAwayListener onClickAway={closePalletColor}>
          <ColorsContainer>
            <Palette>
              {palletOfColors.map(color => (
                <ColorDrop
                  key={color}
                  onMouseDown={e => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onClick={e => {
                    onColorSelect(color);
                  }}
                  color={color}
                />
              ))}
            </Palette>
          </ColorsContainer>
        </ClickAwayListener>
      </Popper>
    </NavBar>
  );
});

export default RichTextMenu;

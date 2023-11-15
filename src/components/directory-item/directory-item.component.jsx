import { useNavigate } from 'react-router-dom';

import {
  DirectoryItemContainer,
  Body,
  BackgroundImage
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {

    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHander = () => navigate(route)

    return(
        <DirectoryItemContainer onClick={onNavigateHander}>
            <BackgroundImage 
              imageUrl={imageUrl}
             />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
      )
}

export default DirectoryItem;
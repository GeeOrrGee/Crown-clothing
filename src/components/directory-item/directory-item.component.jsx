import {
    BackgroundImage,
    DirectoryBody,
    DirectoryItemContainer,
} from './directory-item.styles.jsx';
import { useNavigate } from 'react-router-dom';
const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();
    const mainNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={mainNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <DirectoryBody>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryBody>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;

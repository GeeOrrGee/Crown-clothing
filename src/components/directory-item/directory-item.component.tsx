import {
    BackgroundImage,
    DirectoryBody,
    DirectoryItemContainer,
} from './directory-item.styles.js';

import { useNavigate } from 'react-router-dom';

import { FC } from 'react';
export type DirectoryItemType = {
    id: number;
    title: string;
    imageUrl: string;
    route: string;
};
export type DirectoryItemProps = {
    category: DirectoryItemType;
};
const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
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

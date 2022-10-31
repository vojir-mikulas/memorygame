export default interface Card {
    id?: number;
    image?: string;
    selected?: boolean;
    matched?: boolean;
    onClick?: () => void;
}
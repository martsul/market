interface IconData {
  id: string;
  side: 'left' | 'right';
}

export interface ButtonData {
  color: 'white' | 'dark' | 'border-white';
  text: string;
  icon?: IconData;
}

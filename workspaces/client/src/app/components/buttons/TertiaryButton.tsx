import { MouseEventHandler } from 'react';

type Props = {
  buttonText: string;
  onClick: MouseEventHandler | undefined;
};

export default function TertiaryButton({ buttonText, onClick }: Props) {
  return (
    <button
      className="button border-tertiary hover:border-tertiary-hover my-1 min-w-48 rounded-md border-2 px-6 py-2 text-xs transition-colors sm:text-sm md:text-base"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

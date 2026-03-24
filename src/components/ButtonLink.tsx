import Link from "next/link";

interface Props {
  href: string;
  label: string;
  variant?: "outline";
}

export const ButtonLink = ({ href, label, variant }: Props) => {
  if (variant === "outline") {
    return (
      <>
        <Link
          href={href}
          className="cta-btn-p cta-btn2-text  rounded-full text-gold bg-white border sm:border-2 md:border-3 lg:border-4 border-gold "
        >
          {label}
        </Link>
      </>
    );
  }
  return (
    <>
      <Link
        href={href}
        className="cta-btn-p cta-btn-text  rounded-full text-cream bg-gold text-shadow-sm"
      >
        {label}
      </Link>
    </>
  );
};

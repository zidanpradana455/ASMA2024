import {Fragment} from 'react';

export const heroMotto='EXCERCITATIO OPTIMUS EST MAGISTER';
const lines=['EXCERCITATIO','OPTIMUS EST','MAGISTER'];

export default function HeroHeadline(){
 let letter=0;
 return <>{lines.map((line,i)=><Fragment key={line}>{i>0?' ':null}<span className="hero-tagline-line" aria-hidden="true">{[...line].map((character,j)=>character===' '?<Fragment key={j}>{' '}</Fragment>:<span className="hero-letter" key={j} style={{'--letter-index':letter++} as React.CSSProperties}><span className="hero-letter-ink" data-character={character}>{character}</span></span>)}</span></Fragment>)}</>;
}

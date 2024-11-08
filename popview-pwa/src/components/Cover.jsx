import style from '../styles/Cover.module.css';

function Cover({portada, portada2, onclick}) {
  return (
    <div className={style.card} onClick={onclick}>
      <img className={style.portada} src={portada} alt="Portada 1" />
      <img className={style.portada2} src={portada2} alt="Portada 2" />
    </div>
  );
}

export default Cover;

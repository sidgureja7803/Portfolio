import { styles } from '../styles';

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section id={idName} className="relative w-full">
        <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 mt-[100px]`}>
          <span className="hash-span" style={{ display: 'block', marginTop: '-100px', paddingBottom: '100px', visibility: 'hidden' }}>&nbsp;</span>
          <Component />
        </div>
      </section>
    );
  };

export default SectionWrapper;
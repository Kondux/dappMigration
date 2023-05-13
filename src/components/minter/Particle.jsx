import shape1 from "./assets/shape1.png";
import shape2 from "./assets/shape2.png";
import shape3 from "./assets/shape3.png";

const Particle = () => {
  const data = [shape1, shape2, shape3];

  return (
    <>
      {data?.map((shape, i) => (
        <span key={i} className={`shape_${i + 1} rotated-style`}>
          <img src={shape} alt="thumb img" />
        </span>
      ))}
    </>
  );
};

export default Particle;

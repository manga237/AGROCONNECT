type props_type = {
  name?: string;
  age?: number;
};
export default function Salutation(props: props_type) {
  if (props.name) {
    return (
      <div>
        <h1>Hello Guy,je suis {props.name} </h1>
      </div>
    );
  }
  return (
    <div>
      <h1>VA TE FAIRE FOUTRE FDP</h1>
    </div>
  );
}

export function Salut({ name, age }: props_type) {
  return (
    <div>
      <p>
        SALUT {name} jai {age} ans
      </p>
    </div>
  );
}
type props = {
  children: React.ReactNode;
  titre: string;
};
export const Container = ({ children, titre }: props) => {
  return (
    <div style={{ backgroundColor: "lime", color: "blue" }}>
      <h1>{titre} </h1>
      {children}
    </div>
  );
};

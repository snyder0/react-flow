import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }: { data: any }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="source" position={Position.Right} />
      <div className="text-updater-node-inner">
        <label htmlFor="text">{data.label}</label>
        <input
          id="text"
          className="text-input"
          name="text"
          defaultValue="0.1"
          // type="number"
          // step="0.01"
          // max="0.1"
          // min="0"
          onChange={data.onChange}
          value={data.randomPercentages}
        />
      </div>
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
      /> */}
      {/* <Handle type="source" position={Position.Bottom} id="b" /> */}
    </div>
  );
}

export default TextUpdaterNode;

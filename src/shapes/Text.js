import React from "react";
import Konva from "konva";
import { Text, Transformer } from "react-konva";

const Text1 = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Text
                shadowBlur={10}
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                onDragEnd={e => {
                    e.target.to({
                        duration: 0.5,
                        easing: Konva.Easings.ElasticEaseOut,
                        scaleX: 1,
                        scaleY: 1,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5
                    });
                }}
                onDragStart={e => {
                    e.target.setAttrs({
                        shadowOffset: {
                            x: 15,
                            y: 15
                        },
                        scaleX: 1.1,
                        scaleY: 1.1
                    });
                }}

                draggable
                onTransformEnd={e => {
                    // transformer is changing scale
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        fontSize: node.font()*scaleX,
                    });
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </React.Fragment>
    );
// })}
};
export default Text1;
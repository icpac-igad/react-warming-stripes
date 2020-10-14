import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import min from "lodash/min";
import max from "lodash/max";
import isEqual from "lodash/isEqual";
import { Surface, Tooltip, Layer } from "recharts";
import { findChildByType } from "recharts/lib/util/ReactUtils";
import { getValueByDataKey } from "recharts/lib/util/ChartUtils";

const colours = [
  "#023858",
  "#045a8d",
  "#0570b0",
  "#3690c0",
  "#74a9cf",
  "#a6bddb",
  "#d0d1e6",
  "#ece7f2",
  "#fff7fb",
  "#ffffe5",
  "#fff7bc",
  "#fee391",
  "#fec44f",
  "#fe9929",
  "#ec7014",
  "#cc4c02",
  "#993404",
  "#662506",
];

const defaultCoordinateOfTooltip = { x: 0, y: 0 };

const getCoordinateOfTooltip = (el) => {
  return { x: el.x, y: el.y };
};

const getPayloadOfTooltip = (el, valueKey, nameKey, unit) => {
  return [
    {
      payload: el,
      name: getValueByDataKey(el, nameKey, ""),
      value: `${getValueByDataKey(el, valueKey)} ${unit ? unit : ""}`,
    },
  ];
};

class Stripes extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
  };

  state = {
    ready: false,
    isTooltipActive: false,
  };

  componentDidMount() {
    const { data, valueKey } = this.props;

    const sdata = data.map((d) => d[valueKey]);

    this.scale = scaleLinear()
      .domain([min(sdata), max(sdata)])
      .range([0, colours.length - 1]);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      ready: true,
    });
  }

  componentDidUpdate(prevProps) {
    const { data, valueKey } = this.props;

    const { data: prevData } = prevProps;

    if (!isEqual(data, prevData)) {
      const sdata = data.map((d) => d[valueKey]);
      this.scale = scaleLinear()
        .domain([min(sdata), max(sdata)])
        .range([0, colours.length - 1]);
    }
  }

  handleMouseEnter(el, evt) {
    const { onMouseEnter, children } = this.props;
    const tooltipItem = findChildByType(children, Tooltip);
    const e = evt.target;
    const dim = e.getBoundingClientRect();
    const x = dim.left;
    const y = dim.top;

    if (tooltipItem) {
      this.setState(
        {
          activeElement: { ...el, x, y },
          isTooltipActive: true,
        },
        () => {
          if (onMouseEnter) {
            onMouseEnter(el);
          }
        }
      );
    } else if (onMouseEnter) {
      onMouseEnter(el);
    }
  }

  handleMouseLeave(el) {
    const { onMouseLeave, children } = this.props;
    const tooltipItem = findChildByType(children, Tooltip);

    if (tooltipItem) {
      this.setState(
        {
          isTooltipActive: false,
        },
        () => {
          if (onMouseLeave) {
            onMouseLeave(el);
          }
        }
      );
    } else if (onMouseLeave) {
      onMouseLeave(el);
    }
  }

  _renderStripes = (data, valueKey, nameKey) => {
    const stripeWidth = 100 / data.length;
    return data.map((d, idx) => {
      const fill = colours[Math.round(this.scale(d[valueKey]))];

      const events = {
        onMouseEnter: this.handleMouseEnter.bind(this, d),
        onMouseLeave: this.handleMouseLeave.bind(this, d),
      };

      return (
        <Layer key={idx} {...events}>
          <rect
            height="100%"
            width={stripeWidth + "%"}
            y={0}
            x={idx * stripeWidth + "%"}
            fill={fill}
          />
        </Layer>
      );
    });
  };

  renderTooltip() {
    const { children, width, height, valueKey, nameKey, unit } = this.props;
    const tooltipItem = findChildByType(children, Tooltip);

    if (!tooltipItem) {
      return null;
    }

    const { isTooltipActive, activeElement } = this.state;
    const viewBox = { x: 0, y: 0, width, height };
    const coordinate = activeElement
      ? getCoordinateOfTooltip(activeElement)
      : defaultCoordinateOfTooltip;
    const payload = activeElement
      ? getPayloadOfTooltip(activeElement, valueKey, nameKey, unit)
      : [];

    return React.cloneElement(tooltipItem, {
      viewBox,
      active: isTooltipActive,
      coordinate,
      payload,
    });
  }

  render() {
    const { data, width, valueKey, height, nameKey } = this.props;
    const { ready } = this.state;
    return (
      <div
        style={{
          cursor: "default",
          height: height,
        }}
      >
        <Surface className="stripe-svg" width={width} height={height}>
          {ready && this._renderStripes(data, valueKey, nameKey)}
        </Surface>
        {this.renderTooltip()}
      </div>
    );
  }
}

export default Stripes;

# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal  # noqa: F401
from dash.development.base_component import Component, _explicitize_args

ComponentType = typing.Union[
    str,
    int,
    float,
    Component,
    None,
    typing.Sequence[typing.Union[str, int, float, Component, None]],
]

NumberType = typing.Union[
    typing.SupportsFloat, typing.SupportsInt, typing.SupportsComplex
]


class DashReactFlow(Component):
    """A DashReactFlow component.
    Component description

    Keyword arguments:

    - id (string; optional):
        Unique ID to identify this component in Dash callbacks.

    - clicked_node (dict; optional)

        `clicked_node` is a dict with keys:

        - id (string; required):
            Unique identifier for the node.

        - position (dict; required):
            Position of the node.

            `position` is a dict with keys:

            - x (number; required)

            - y (number; required)

        - label (string; required):
            Label for the node, displayed inside the node.

        - node_type (string; optional)

    - edges (list of dicts; optional):
        Edges to display from the start, the ids must match the nodes.

        `edges` is a list of dicts with keys:

        - id (string; required)

        - source (string; required)

        - target (string; required)

        - source_handle (string; optional):
            The type of handle on the source node (we can only connect to
            handles of the same type) If not specified, it will connect to
            the default handle.

        - target_handle (string; optional)

    - node_types (list of dicts; optional):
        Allow creating custom nodes, you have to specify the node type in
        the nodes entry/when creating the node.

        `node_types` is a list of dicts with keys:

        - name (string; required)

        - title (string; required)

        - targets (list of dicts; required)

            `targets` is a list of dicts with keys:

            - id (string; required)

            - position (string; required):

                Position of the handle. Should be one of 'top', 'bottom',

                'left', 'right'.

        - sources (list of dicts; required)

            `sources` is a list of dicts with keys:

            - id (string; required)

            - position (string; required):

                Position of the handle. Should be one of 'top', 'bottom',

                'left', 'right'.

    - nodes (list of dicts; optional):
        Nodes to display from the start.

        `nodes` is a list of dicts with keys:

        - id (string; required):
            Unique identifier for the node.

        - position (dict; required):
            Position of the node.

            `position` is a dict with keys:

            - x (number; required)

            - y (number; required)

        - label (string; required):
            Label for the node, displayed inside the node.

        - node_type (string; optional)"""

    _children_props: typing.List[str] = []
    _base_nodes = ["children"]
    _namespace = "dash_react_flow"
    _type = "DashReactFlow"
    NodesPosition = TypedDict("NodesPosition", {"x": NumberType, "y": NumberType})

    Nodes = TypedDict(
        "Nodes",
        {
            "id": str,
            "position": "NodesPosition",
            "label": str,
            "node_type": NotRequired[str],
        },
    )

    Edges = TypedDict(
        "Edges",
        {
            "id": str,
            "source": str,
            "target": str,
            "source_handle": NotRequired[str],
            "target_handle": NotRequired[str],
        },
    )

    NodeTypesTargets = TypedDict("NodeTypesTargets", {"id": str, "position": str})

    NodeTypesSources = TypedDict("NodeTypesSources", {"id": str, "position": str})

    NodeTypes = TypedDict(
        "NodeTypes",
        {
            "name": str,
            "title": str,
            "targets": typing.Sequence["NodeTypesTargets"],
            "sources": typing.Sequence["NodeTypesSources"],
        },
    )

    ClickedNodePosition = TypedDict(
        "ClickedNodePosition", {"x": NumberType, "y": NumberType}
    )

    ClickedNode = TypedDict(
        "ClickedNode",
        {
            "id": str,
            "position": "ClickedNodePosition",
            "label": str,
            "node_type": NotRequired[str],
        },
    )

    def __init__(
        self,
        nodes: typing.Optional[typing.Sequence["Nodes"]] = None,
        edges: typing.Optional[typing.Sequence["Edges"]] = None,
        node_types: typing.Optional[typing.Sequence["NodeTypes"]] = None,
        clicked_node: typing.Optional["ClickedNode"] = None,
        id: typing.Optional[typing.Union[str, dict]] = None,
        **kwargs,
    ):
        self._prop_names = ["id", "clicked_node", "edges", "node_types", "nodes"]
        self._valid_wildcard_attributes = []
        self.available_properties = [
            "id",
            "clicked_node",
            "edges",
            "node_types",
            "nodes",
        ]
        self.available_wildcard_properties = []
        _explicit_args = kwargs.pop("_explicit_args")
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashReactFlow, self).__init__(**args)


setattr(DashReactFlow, "__init__", _explicitize_args(DashReactFlow.__init__))

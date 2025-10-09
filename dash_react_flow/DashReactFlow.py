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

    - edges (list of dicts; optional):
        Edges to display from the start, the ids must match the nodes.

        `edges` is a list of dicts with keys:

        - id (string; required)

        - source (string; required)

        - target (string; required)

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
            Label for the node, displayed inside the node."""

    _children_props = []
    _base_nodes = ["children"]
    _namespace = "dash_react_flow"
    _type = "DashReactFlow"
    NodesPosition = TypedDict("NodesPosition", {"x": NumberType, "y": NumberType})

    Nodes = TypedDict("Nodes", {"id": str, "position": "NodesPosition", "label": str})

    Edges = TypedDict("Edges", {"id": str, "source": str, "target": str})

    def __init__(
        self,
        nodes: typing.Optional[typing.Sequence["Nodes"]] = None,
        edges: typing.Optional[typing.Sequence["Edges"]] = None,
        id: typing.Optional[typing.Union[str, dict]] = None,
        **kwargs,
    ):
        self._prop_names = ["id", "edges", "nodes"]
        self._valid_wildcard_attributes = []
        self.available_properties = ["id", "edges", "nodes"]
        self.available_wildcard_properties = []
        _explicit_args = kwargs.pop("_explicit_args")
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashReactFlow, self).__init__(**args)


setattr(DashReactFlow, "__init__", _explicitize_args(DashReactFlow.__init__))

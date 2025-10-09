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

    - initial_edges (list of dicts; optional)

        `initial_edges` is a list of dicts with keys:

        - id (string; required)

        - source (string; required)

        - target (string; required)

    - initial_nodes (list of dicts; optional)

        `initial_nodes` is a list of dicts with keys:

        - id (string; required)

        - position (dict; required)

            `position` is a dict with keys:

            - x (number; required)

            - y (number; required)

        - data (dict with strings as keys and values of type boolean | number | string | dict | list; required)"""

    _children_props = []
    _base_nodes = ["children"]
    _namespace = "dash_react_flow"
    _type = "DashReactFlow"
    InitialNodesPosition = TypedDict(
        "InitialNodesPosition", {"x": NumberType, "y": NumberType}
    )

    InitialNodes = TypedDict(
        "InitialNodes",
        {
            "id": str,
            "position": "InitialNodesPosition",
            "data": typing.Dict[typing.Union[str, float, int], typing.Any],
        },
    )

    InitialEdges = TypedDict("InitialEdges", {"id": str, "source": str, "target": str})

    def __init__(
        self,
        initial_nodes: typing.Optional[typing.Sequence["InitialNodes"]] = None,
        initial_edges: typing.Optional[typing.Sequence["InitialEdges"]] = None,
        id: typing.Optional[typing.Union[str, dict]] = None,
        **kwargs,
    ):
        self._prop_names = ["id", "initial_edges", "initial_nodes"]
        self._valid_wildcard_attributes = []
        self.available_properties = ["id", "initial_edges", "initial_nodes"]
        self.available_wildcard_properties = []
        _explicit_args = kwargs.pop("_explicit_args")
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashReactFlow, self).__init__(**args)


setattr(DashReactFlow, "__init__", _explicitize_args(DashReactFlow.__init__))

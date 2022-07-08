'use strict';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "1.25em",
            },
        },
    },
});

export default theme;
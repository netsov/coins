import React from 'react';
import './style.css';

import { ActionButton } from '../material/ActionButton';
import { Switch } from '../material/Switch';
import { Dialog } from '../material/Dialog';

export const Settings = ({ closeSettings, settings, updateSettings }) => (
  <Dialog
    open={true}
    header="Settings"
    buttons={<ActionButton handleClick={closeSettings}>Done</ActionButton>}
  >
    <form>
      <Switch
        value="Show "
        checked={settings.showCharts}
        onToggle={() => updateSettings('showCharts', !settings.showCharts)}
      >
        Show charts
      </Switch>
    </form>
  </Dialog>
);

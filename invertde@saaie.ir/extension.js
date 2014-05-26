
const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Tweener = imports.ui.tweener;

let button,state;
const DisabledIcon = 'light-on-symbolic';
const EnabledIcon = 'light-off-symbolic';

function _toggleInvert(){
    if(state){
	state=false;
        let icon = new St.Icon({ icon_name: DisabledIcon,
                             style_class: 'system-status-icon' });

        button.set_child(icon);
        Util.spawn(['/usr/bin/xcalib', '-i', '-a']);
    }
    else{
	state=true;
        let icon = new St.Icon({ icon_name: EnabledIcon,
                             style_class: 'system-status-icon' });

        button.set_child(icon);
        Util.spawn(['/usr/bin/xcalib', '-i', '-a']); 
    }
}
function init(extensionMeta) {
   state=false;
   let theme = imports.gi.Gtk.IconTheme.get_default();
   theme.append_search_path(extensionMeta.path + "/icons");
   button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: DisabledIcon,
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _toggleInvert);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}

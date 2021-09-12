var available_entities  = {};
var activeEntities={};

for (var i = predef_entities.length - 1; i >= 0; i--) {
	available_entities[predef_entities[i].id]=predef_entities[i];
}


function addActiveEntity(id) {
	var selected_entity = available_entities[id];
	var active_entity = new ActiveEntity(selected_entity.name, selected_entity.description,selected_entity.changeType,selected_entity.changeRate,document.getElementById(id).value);
	activeEntities[active_entity.id] = active_entity;
	buildDashboard();
}

function removeActiveEntity(id) {
	delete activeEntities[id];
	buildDashboard();
}

function createNewEntity() {
	var name = document.getElementsByName('create-name')[0].value;
	var description = document.getElementsByName('create-description')[0].value;
	var change_type = document.getElementsByName('create-change-type')[0].value;
	var change_rate = change_type==='FIXED' ? 0: document.getElementsByName('create-change-rate')[0].value;
	
	var created_entity = new Entity(name, description, change_type, change_rate, 0);
	available_entities[created_entity.id] = created_entity;
	document.getElementsByName('create-name')[0].value="";
	document.getElementsByName('create-description')[0].value="";
	document.getElementsByName('create-change-rate')[0].value=0;
	document.getElementsByName('create-change-type')[0].value='APPRECIATING';
	initWorkspace();
}

function initWorkspace() {
	var html = '<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"><thead><tr><th colspan="2">Name</th><th colspan="2">Description</th><th colspan="2">InitialValue</th><th colspan="2">Type</th><th colspan="1">Rate</th><th colspan="1">Add</th></tr></thead><tbody>';
	var odd = false;
	Object.values(available_entities).forEach(entity => {
		var entityHtml = (odd?'<tr class="pure-table-odd">':'<tr>')+'<td colspan="2">'+entity.name+'</td colspan="2"><td colspan="2">'+entity.description+'</td colspan="2"><td colspan="2"><input type="number" value=0 min=0 id="'+entity.id+'"></td><td colspan="2">'+entity.changeType+'</td><td colspan="1">'+entity.changeRate+'</td><td colspan="1"><button onclick="addActiveEntity(\''+entity.id+'\')">Add</button></td></tr>';
		html+=entityHtml;
		odd=!odd;
	});

	html+= "</tbody></table>";
	document.getElementById('workspace').innerHTML = html;
}

function initCustomEntityBuilder() {
	var html = "";
	document.getElementById('builder').innerHTML = html;
}

function buildDashboard() {
	var duration = document.getElementById('duration').value;
	var html;
	if (Object.keys(activeEntities).length > 0) {
		 html = '<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"><thead><tr><th colspan="2">Name</th><th colspan="2">Description</th><th colspan="2">InitialValue</th><th colspan="2">Type</th><th colspan="1">Rate</th><th colspan="2">Current Value</th><th colspan="1">Remove</th></tr></thead><tbody>';
		Object.values(activeEntities).forEach(entity => {
			entity.computeFor(duration);
			html+= '<tr><td colspan="2">'+entity.name+'</td><td colspan="2">'+entity.description+'</td><td colspan="2">'+entity.initialValue+'</td><td colspan="2">'+entity.changeType+'</td><td colspan="1">'+entity.changeRate+'</td><td colspan="2">'+Math.round((entity.currentValue + Number.EPSILON) * 100) / 100+'</td><td colspan="1"><button onclick="removeActiveEntity(\''+entity.id+'\')">Remove</button></td></tr>';
		});
		html+= '</tbody></table>';

	} else {
		html = 'No data available, please initialize the simulation...'
	}
	document.getElementById('dashboard').innerHTML = html;
}


initWorkspace();
buildDashboard();
      

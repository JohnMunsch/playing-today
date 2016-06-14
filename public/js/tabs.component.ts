angular.module('Playing').component('tabs', {
  bindings: {
    games: '<',
    numPlayers: '<'
  },
  controller: function () {
    this.$onInit = () => {
      $('tabs a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      })
    };
  },
  template: `
    <div class="gamesByPlayerCount">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active">
          <a href="#tab-1" aria-controls="home" role="tab" data-toggle="tab">
            Games for {{ $ctrl.numPlayers }} Players
          </a>
        </li>
        <li role="presentation">
          <a href="#tab-2" aria-controls="profile" role="tab" data-toggle="tab">
            All Games
          </a>
        </li>
      </ul>
    
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="tab-1">
          <games games="$ctrl.games" num-players="$ctrl.numPlayers"></games>
        </div>
        <div role="tabpanel" class="tab-pane" id="tab-2">
          <games games="$ctrl.games"></games>
        </div>
      </div>
    </div>`
});
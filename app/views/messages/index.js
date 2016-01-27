  var atk           = 10000;
  var ability1      = 0;
  var ability2      = 1;
  var ability3      = 0;
  var ability4      = 1;
  var leader_skill  = 1;
  var friend_skill  = 1;
  var dmg_atk       = 0;
  var dmg_normal    = 0;
  var dmg_smash     = 0;
  var compatibility = 1;

  function printProperties (obj) {
    var prop, properties;
    properties = '';
    for (prop in obj) {
      properties += prop + '=' + obj[prop] + '\n';
    }
    return alert(properties);
  }

  function parseInput(element, defaultVal) {
    var ret = defaultVal;

    var val = $(element).val();
    if(!val || !val.match(/^[０-９0-9\.．]+$/g)){
      $(element).val("");
      return ret;
    }
    
    var han = val.replace(/[０-９．]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
    if(val.match(/[０-９]/g)){
        $(element).val(han);
    }
    
    ret = parseFloat($(element).val());
    return ret;
  }

  function dmg_calc() {
    atk          = parseInput('#atk', 10000);
    ability1     = parseInput('#ability1', 0);
    ability2     = parseInput('#ability2', 1);
    ability3     = parseInput('#ability3', 0);
    ability4     = parseInput('#ability4', 1);
    leader_skill = parseInput('#leader_skill', 1);
    friend_skill = parseInput('#friend_skill', 1);

    dmg_atk = atk * leader_skill * friend_skill;
    dmg_normal = dmg_atk * (1 + ability1) * ability2 * compatibility;
    dmg_smash = dmg_normal * (1.5 + ability3) * ability4;

    $('#dmg-atk').text(Math.floor(dmg_atk).toLocaleString());
    $('#dmg-normal').text(Math.floor(dmg_normal).toLocaleString());
    $('#dmg-smash').text(Math.floor(dmg_smash).toLocaleString());
    
    $('.atk').text(atk.toLocaleString());
    $('.leader-skill').text(leader_skill.toLocaleString());
    $('.friend-skill').text(friend_skill.toLocaleString());
    $('.ability1').text(ability1.toLocaleString());
    $('.ability2').text(ability2.toLocaleString());
    $('.ability3').text(ability3.toLocaleString());
    $('.ability4').text(ability4.toLocaleString());
    $('.dmg-atk').text(dmg_atk.toLocaleString());
    $('.dmg-normal').text(dmg_normal.toLocaleString());
    $('.dmg-smash').text(dmg_smash.toLocaleString());
  }

  $(document).ready( function(){
    // ページ読み込み時に実行したい処理
    // ダメージのデフォルト値を表示
    dmg_calc();
    
    // ページ内の最初の入寮項目にフォーカス
    $('input:visible').first().focus();
  });

  $('.input').change(function() {
    dmg_calc();
  });

  $(".dmgToggle").click(function(){
    $(".dmgCollapse").collapse('toggle');
    
    if ($(this).text() == "計算式を表示"){
      $(this).text("計算式を隠す");
    }else{
      $(this).text("計算式を表示");
    }
  });

  $(".upCompatiToggle").click(function(){
    $(".upCompatiToggle").removeClass("on");
    $(".downCompatiToggle").removeClass("on");

    if (compatibility == 1.5){
      compatibility = 1;
      $(".upCompati").addClass("hidden");
      $(".compati").addClass("hidden");
    } else{
      compatibility = 1.5;
      $(".compati").removeClass("hidden");
      $(".upCompati").removeClass("hidden");

      $(".downCompati").addClass("hidden");
      $(".upCompatiToggle").addClass("on");
    }
    dmg_calc();
  });

  $(".downCompatiToggle").click(function(){
    $(".upCompatiToggle").removeClass("on");
    $(".downCompatiToggle").removeClass("on");

    if (compatibility == 2/3){
      compatibility = 1;
      $(".downCompati").addClass("hidden");
      $(".compati").addClass("hidden");
    } else{
      compatibility = 2/3;
      $(".compati").removeClass("hidden");
      $(".downCompati").removeClass("hidden");

      $(".upCompati").addClass("hidden");
      $(".downCompatiToggle").addClass("on");
    }
    dmg_calc();
  });
  
  $(function() {
    $('input').bind("keydown", function(e) {
        var n = $("input").length;
        //13=エンターkeyです
        if (e.which == 13)
        {
            e.preventDefault();
            var nextIndex = $('input').index(this) + 1;
            if(nextIndex < n) {
                //次のやつにfocus        
                $('input')[nextIndex].focus();
            } else {
                //最後のやつなので#login-btnをクリック        
                $('input')[nextIndex-1].blur();
                $('#login-btn').click();
            }
        }
    });
  });

  // スムーズスクロール
  $(function(){
  	// ページ内リンクをクリックすると
  	$('a[href^=#]').click(function(){
   		// スクロールスピード
   		var speed = 500;
   		// クリックしたリンク先を保存
  		var href= $(this).attr("href");
  		// クリックしたリンク先が#または空のときは
  		var target = $(href == "#" || href == "" ? 'html' : href);
  		// トップへ移動する
  		var position = target.offset().top;
  		// リンク先へスムーズに移動する
  		$("html, body").animate({scrollTop:position}, speed, "swing");
  		return false;
  	});
  });
  // page Topフェードイン・アウト
  $(function(){
  	$(window).bind("scroll", function() {
  	if ($(this).scrollTop() > 50) { 
  		$(".page-top").fadeIn();
  	} else {
  		$(".page-top").fadeOut();
  	}
  	// ドキュメントの高さ
  	scrollHeight = $(document).height();
  	// ウィンドウの高さ+スクロールした高さ→ 現在のトップからの位置
  	scrollPosition = $(window).height() + $(window).scrollTop();
  	// フッターの高さ
  	footHeight = $("footer").height();
  	
  	// スクロール位置がフッターまで来たら
  	if ( scrollHeight - scrollPosition  <= footHeight ) {
  		// ページトップリンクをフッターに固定
  		$(".page-top a").css({"position":"absolute","bottom": "0px"});
  	} else {
  		// ページトップリンクを右下に固定
  		$(".page-top a").css({"position":"fixed","bottom": "0px"});
  		}
  	});
  });

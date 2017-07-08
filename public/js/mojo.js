/* mojo javascript */
(function($) {
  $(function() {
    /* =========================================== */
    /* ------------------ common ------------------ */
    mojo.mojo =  $('body').attr('data-mojo');
    mojo.dialog = $('#dialog');
    mojo.errcode = $('body').attr('data-error');

    if (mojo.mojo != "") {
        mojo.mojoint = parseInt(mojo.mojo.substr(0,1));
        mojo.mojo = Base64.decode(mojo.mojo.substr(1, mojo.mojo.length));
        mojo.mojos = mojo.mojo.split('@@@'); 
        mojo.era_id = $('#academic_agency_class').attr('data-era_id'); 
        mojo.quarter = $('#academic_agency_class').attr('data-quarter');
        mojo.quarter_id = $('#academic_agency_class').attr('data-quarter_id');
    }

    /* ajax */
    mojo.ajax = function(key, val, params, data) {
      data = (!data)? {} : data;
      mojo.ajaxurl = '/ajax/' + key + '/' + val + '/' + params + '/';
console.log(mojo.ajaxurl);
console.log(data);
      $.ajax({
        url: mojo.ajaxurl,
        type: 'post',
        dataType: 'json',
        data: data,
        success: function(res) {
          if (1 == parseInt(res.code)) {
console.log(res);
            switch(key)
            {
            case 'admin':
              switch(val)
              {
              case 'academic_agency':
                switch(params)
                {
                case 'add':
                case 'mod':
                case 'del':
                  $('#grid-academic_agency').data('kendoGrid').setDataSource(new kendo.data.DataSource({ data: res.data, page: 1, pageSize: 10 }));
                  $('.btn-academic_agency-mod').on('click', function(e) {
                      e.preventDefault();
                      var tr = $(e.target).closest("tr");
                      var tds = $(tr).find("td");
                      mojo.dialog_maintain( 'academic_agency', 'mod', {"id": $(tds[0]).html(), "institution_code": $(tds[1]).html(), "cname": $(tds[3]).html()} );
                  });
                  $('.btn-academic_agency-del').on('click', function(e) {
                      e.preventDefault();
                      var tr = $(e.target).closest("tr");
                      var tds = $(tr).find("td");
                      mojo.dialog_maintain( 'academic_agency', 'del', {"id": $(tds[0]).html(), "institution_code": $(tds[1]).html(), "cname": $(tds[3]).html()} );
                  });
                  mojo.ajax('refs', 'academic_agency', 'get');
                  break;
                }
                break;
              case 'academic_agency_agent':
                switch(params)
                {
                case 'add':
                case 'mod':
                case 'del':
                  $('#grid-academic_agency_agent').data('kendoGrid').setDataSource(new kendo.data.DataSource({ data: res.data, page: 1, pageSize: 10 }));
                  $('.btn-academic_agency_agent-mod').on('click', function(e) {
                      e.preventDefault();
                      var tr = $(e.target).closest("tr");
                      var tds = $(tr).find("td");
                      mojo.dialog_maintain( 'academic_agency_agent', 'mod', {"id": $(tds[0]).html(), "agency_id": $(tds[1]).html(), "username": $(tds[2]).html(), "email": $(tds[3]).html()} );
                  });
                  $('.btn-academic_agency_agent-del').on('click', function(e) {
                      e.preventDefault();
                      var tr = $(e.target).closest("tr");
                      var tds = $(tr).find("td");
                      mojo.dialog_maintain( 'academic_agency_agent', 'del', {"id": $(tds[0]).html(), "agency_id": $(tds[1]).html(), "username": $(tds[2]).html()} );
                  });
                  break;
                }
                break;
              case 'academic_agency_unlock':
                switch(params)
                {
                case 'yes':
                case 'no':
                  window.location = "/admin/unlock/";  
                  break;
                }
                break;
              case 'academic_class':
                switch(params)
                {
                case 'add':
                  break;
                case 'sel':
                  break;
                case 'mod':
                  break;
                }
                break;
              case 'academic_era':
                switch(params)
                {
                case 'add':
                case 'mod':
                  $('#grid-academic_era').data('kendoGrid').setDataSource(new kendo.data.DataSource({ data: res.data, page: 1, pageSize: 12 }));
                  $('.btn-academic_era-mod').on('click', function(e) {
                    e.preventDefault();
                    var tr = $(e.target).closest("tr");
                    var tds = $(tr).find("td");
                    mojo.dialog_settings( 'academic_era', 'mod', {'id': $(tds[0]).html(), 'era_id': $(tds[1]).html(), 'quarter': $(tds[2]).html(), 'cname': $(tds[3]).html(), 'online': $(tds[4]).html(), 'offline': $(tds[5]).html() } );
                  });
                }
                break;
              }
              break;
            case 'agent':
              switch(val)
              {
              case 'academic_agency_class':
                case 'add':
                case 'del':
                  window.location = "/agent/fill/";  
                  break;
                break;
              case 'academic_agency_contact':
                switch(params)
                {
                case 'add':
                case 'mod':
                  $('#grid-academic_agency_contact').data('kendoGrid').setDataSource(new kendo.data.DataSource({ data: res.data, page: 1, pageSize: 10 }));
                  $('.btn-academic_agency_contact-mod').on('click', function(e) {
                    e.preventDefault(); 
                    var tr = $(e.target).closest("tr");
                    var tds = $(tr).find("td");
                    mojo.json = {'id': $(tds[0]).html(), 'agency_id': $(tds[1]).html(), 'cname': $(tds[2]).html(), 'title': $(tds[3]).html(), 'manager': $(tds[4]).html(), 'staff': $(tds[5]).html(), 'role': $(tds[6]).html(), 'area_code': $(tds[7]).html(), 'phone': $(tds[8]).html(), 'ext': $(tds[9]).html(), 'email': $(tds[11]).html(), 'spare_email': $(tds[12]).html(), 'primary': $(tds[13]).html()};
                    mojo.dialog_info('academic_agency_contact', 'mod', mojo.json);
                  }); 
                  break;
                }
                break;
              case 'academic_agency_hr':
                switch(params)
                {
                case 'add':
                case 'mod':
                  $('#grid-academic_agency_hr').data('kendoGrid').setDataSource(new kendo.data.DataSource({ data: res.data, page: 1, pageSize: 10 }));
                  $('.btn-academic_agency_hr-mod').on('click', function(e) {
                    e.preventDefault(); 
                    var tr = $(e.target).closest("tr");
                    var tds = $(tr).find("td");
                    mojo.json = {'agency_id': $(tds[0]).html(), 'era_id': $(tds[1]).html(), 'academic_era_code': $(tds[2]).html(), 'administration': $(tds[3]).html(), 'subject': $(tds[4]).html(), 'adjunct': $(tds[5]).html(), 'reserve': $(tds[6]).html(), 'others': $(tds[7]).html(), 'note': $(tds[8]).html()};                                                                                                                                                                      
                    mojo.dialog_info('academic_agency_hr', 'mod', mojo.json);
                  }); 
                  break;
                }
                break;
              case 'academic_agency_unlock':
                switch(params)
                {
                case 'mod':
                  window.location = "/agent/unlock/";  
                  break;
                }
                break;
              case 'profile':
                switch(params) 
                {
                case 'mod':
                    console.log(res.data); 
                    /*這邊可以異動 email 及pwd，如果資料有異動成功的話，則res.data 會等於 1
                      如果異動的資料是一樣，則res.data 會等於 0，等於沒修改！
                      modi by thucop
                    */
                    if( 0 < parseInt(res.data)){
                        kendo.alert('資料異動成功！');
                    }else{
                        kendo.alert('資料無異動！');

                    }
                    break;
                }
                break;
              case 'academic_agency':
                switch(params) 
                {
                case 'mod':
                    console.log(res.data); 
                    kendo.alert('資料已儲存！');
                    break;
                }
                break;
            }
            break;
            case 'profile':
                switch(val) 
                {
                case 'mod':
                    console.log(res.data); 
                    break;
                }
                break;
            case 'refs':
              switch(val)
              {
              case 'academic_institution':
                mojo.refs.academic_institution = {};
                for (var i=0; i<res.data.length; i++)
                  mojo.refs.academic_institution[res.data[i]['code']] = res.data[i];
                break;
              case 'academic_agency':
                mojo.refs.academic_agency = {};
                for (var i=0; i<res.data.length; i++)
                  mojo.refs.academic_agency[res.data[i]['id']] = res.data[i];
                break;
              case 'area_list':
                mojo.refs.area_list = {};
                for (var i=0; i<res.data.length; i++)
                  mojo.refs.area_list[res.data[i]['code']] = res.data[i]['cname'];
                break;
              case 'content_list':
                mojo.refs.content_list = {};
                for (var i=0; i<res.data.length; i++)
                  mojo.refs.content_list[res.data[i]['code']] = res.data[i]['cname'];

                if ($('#editor-content').length) {
                  $('#editor-content').empty();
                  for (var x in mojo.refs.content_list) 
                    $('#editor-content').append('<option value="' + x + '">' + mojo.refs.content_list[x] + '</option>');
                  if (mojo.data.academic_agency_classe && mojo.data.academic_agency_class[0].content_code)
                    $('#editor-content').val(mojo.data.academic_agency_class[0].content_code);
                }
                break;
              case 'country_list':
                mojo.refs.country_list = {};
                mojo.refs.country_code_list = [];
                mojo.refs.country_if = [];
                for (var i=0; i<res.data.length; i++) {
                  mojo.refs.country_list[res.data[i]['code']] = res.data[i];
                  mojo.refs.country_code_list.push({'code': res.data[i].code, 'cname': res.data[i].cname, 'ename': res.data[i].ename, 'country_code': res.data[i].cname + ' ' + res.data[i].ename + ' ' + res.data[i].code });
                  mojo.refs.country_if.push( new mojo.country_if(res.data[i].code, res.data[i].cname, res.data[i].ename) );
                }
                if (mojo.data.academic_agency_class_country) {
                  for (var i=0; i<mojo.data.academic_agency_class_country.length; i++)
                    mojo.data.academic_agency_class_country[i].country_code = mojo.refs.country_list[mojo.data.academic_agency_class_country[i].country_code].cname + ' ' + mojo.refs.country_list[mojo.data.academic_agency_class_country[i].country_code].ename + ' ' + mojo.refs.country_list[mojo.data.academic_agency_class_country[i].country_code].code;
                  $('#grid-academic_agency_class_country div.k-grid-content table tbody tr').each(function (index) {
                    var tds = $(this).find("td");
                    $(tds[0]).html( mojo.refs.country_list[$(tds[0]).html()].cname + ' ' + mojo.refs.country_list[$(tds[0]).html()].ename + ' ' + mojo.refs.country_list[$(tds[0]).html()].code );
                  });
                }
                mojo.refs.major_list = {};
                for (var i=0; i<res.data.length; i++)
                  mojo.refs.major_list[res.data[i]['code']] = res.data[i];
                break;
              case 'minor_list':
                mojo.refs.minor_list = {};
                for (var i=0; i<res.data.length; i++)
                  mojo.refs.minor_list[res.data[i]['code']] = res.data[i];

                if ($('#editor-minor_code').length) {
                  $('#editor-minor_code').empty();
                  for (var x in mojo.refs.minor_list) {
                    if (mojo.refs.minor_list[x].major_code == mojo.major)
                      $('#editor-minor_code').append('<option value="' + x + '">' + mojo.refs.minor_list[x].cname + '</option>');
                    else if (mojo.data.academic_agency_class && mojo.data.academic_agency_class[0].minor_code)
                      $('#editor-minor_code').append('<option value="' + x + '">' + mojo.refs.minor_list[x].cname + '</option>');
                  }
                }
                break;
              case 'target_list':
                mojo.refs.target_list = {};
                for (var i=0; i<res.data.length; i++)
                  mojo.refs.target_list[res.data[i]['code']] = res.data[i]['cname'];
                if ($('#editor-target').length) {
                  $('#editor-target').empty();
                  for (var x in mojo.refs.target_list) 
                    $('#editor-target').append('<option value="' + x + '">' + mojo.refs.target_list[x] + '</option>');
                 
                  if (mojo.data.academic_agency_class && mojo.data.academic_agency_class[0].target_code)
                    $('#editor-target').val(mojo.data.academic_agency_class[0].target_code);
                }
                break;
              }
              break;
            }
          }
        }
      });
    };

    mojo.mojo_if = function(id) {
      return $('#' + id).length;
    };

    mojo.country_if = function( code, cname, ename ) {
        this.mojo_country_if = code;
        this,cname = cname;
        this.ename = ename;
        this.textForSearch = code + ' ' + cname + ename;
    }

    mojo.excel = function(e) {
      var files = e.target.files,file;
      if (!files || files.length == 0) return;
      file = files[0];
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        var filename = file.name;
        // pre-process data
        var binary = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        // call 'xlsx' to read the file
        var oFile = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
      };
      fileReader.readAsArrayBuffer(file);
    };

    /* timer */
    mojo.timer = function() {
      if (mojo.flag) {
        mojo.flag = false;
        switch(mojo.tag)
        {
        case 'summary-country_reach':
            $('#summary-reach').html($('.' + mojo.tag).html());
            mojo.summary.reach = 0;
            if (!isNaN($('#summary-reach').html()))
              mojo.summary.reach = parseFloat($('#summary-reach').html());
            mojo.summaryHours();
            break;
        }
      }
      mojo.watcher = setTimeout( mojo.timer, 1000 );
    };

    mojo.watcher = setTimeout( mojo.timer, 1000 );
    mojo.flag = false;
    mojo.tag = 'NA';
    
    /* =========================================== */
    /* ------------------ login ------------------ */
    /* check input */
    mojo.check_login = function() {
      var pass = true;
      if (!mojo.reg.username.test($('#username').val()) || !mojo.reg.userpass.test($('#userpass').val())) {
          pass = false;
          kendo.alert('請確認您的帳號與密碼！');
      }   
      return pass;
    };

    mojo.watch_login = function() {
      $('#username').on('focus', function(e) {
        $(this).val("");
      });

      $('#userpass').on('focus', function(e) {
        $(this).val("");
      });

      $('#btn-login-agent').on('click', function(e) {
        e.preventDefault();
        if (mojo.check_login()) {
          $('#form-login').attr('action', $(this).attr('href'));
          $('#form-login').submit();
        }
      });

      $('#btn-login-admin').on('click', function(e) {
        e.preventDefault();
        if (mojo.check_login()) {
          $('#form-login').attr('action', $(this).attr('href'));
          $('#form-login').submit();
        }
      });

      if (mojo.errcode == 'login')
        kendo.alert('請確認您的帳號與密碼！');
    };

    if (mojo.mojo_if('sec-login'))
      mojo.watch_login();
    /* =========================================== */
    /* ----------------- activate ----------------- */
    mojo.check_activate = function() {
      var pass = true;
      if (!mojo.reg.userpass.test($('#userpass').val()) || !mojo.reg.userpass.test($('#checkpass').val()) || $('#userpass').val() != $('#checkpass').val()) {
        pass = false;
        kendo.alert('請確認您的密碼！');
      }
      return pass;
    }

    mojo.watch_activate = function() {
      $('#userpass').on('focus', function(e) {
        $(this).val("");
      });

      $('#checkpass').on('focus', function(e) {
        $(this).val("");
      });

      $('i.fa.fa-eye').on('click', function(e) {
        if ('icon-userpass' == $(this).attr('id'))
          $('#userpass').attr('type', 'text');
        else 
          $('#checkpass').attr('type', 'text');
      });

      $('#btn-activate-agent').on('click', function(e) {
        e.preventDefault();
        if (mojo.check_activate()) {
          $('#form-activate').attr('action', $(this).attr('href'));
          $('#form-activate').submit();
        }
      });
    };

    if (mojo.mojo_if('sec-activate'))
      mojo.watch_activate();
    /* =========================================== */
    /* ------------------- admin ------------------- */
    /* status */

    /* maintain */
    mojo.dialog_maintain = function(key, val, params) {
      switch(key)
      {
      case 'academic_agency':
        $('#dialog-academic_agency').kendoDialog({
          minWidth: 480,
          minHeight: 120,
          title: "機構列表",
          content: '',
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {
              case 'add':
                mojo.json = { 'id': 0, 'institution_code': $('#dialog-institution_code').val(), 'cname': $('#dialog-cname').val() };
                break;
              case 'del':
                mojo.json = params;
                break;
              case 'mod':
                mojo.json = { 'id': params.id, 'institution_code': $('#dialog-institution_code').val(), 'cname': $('#dialog-cname').val() };
                break;
              }
              mojo.ajax('admin', key, val, mojo.json);
            }},
            { text: '取消'}
          ],
        });

        switch(val)
        {
        case 'add':
          mojo.html  = '<div><label for="dialog-institution_code">學校名稱</label><select id="dialog-institution_code" class="form-control"></select></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-cname">機構名稱</label><input type="text" id="dialog-cname" class="form-control" /></div>';
          $('#dialog-academic_agency').data('kendoDialog').content(mojo.html).open().center();
          for (var x in mojo.refs.academic_institution) 
            $('#dialog-institution_code').append('<option value="' + x + '">' + mojo.refs.academic_institution[x].aka + ' ' + mojo.refs.academic_institution[x].cname + '</option>');
          break;
        case 'mod':
          mojo.html  = '<div><label for="dialog-institution_code"><select id="dialog-institution_code" class="form-control"></select></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-cname">機構名稱</label><input type="text" id="dialog-cname" class="form-control" /></div>';
          $('#dialog-academic_agency').data('kendoDialog').content(mojo.html).open().center();
          for (var x in mojo.refs.academic_institution)  {
            if (params.institution_code == x) 
              $('#dialog-institution_code').append('<option value="' + x + '" selected>' + mojo.refs.academic_institution[x].aka + ' ' + mojo.refs.academic_institution[x].cname + '</option>');
            else   
              $('#dialog-institution_code').append('<option value="' + x + '">' + mojo.refs.academic_institution[x].aka + ' ' + mojo.refs.academic_institution[x].cname + '</option>');
          }
          $('#dialog-cname').val(params.cname);
          break;
        case 'del':
          mojo.html = '<div><label class="warning">刪除 ' + params.cname + ' 與 使用者？</label></div>';
          $('#dialog-academic_agency').data('kendoDialog').content(mojo.html).open().center();
          break;
        } 
        break;
      case 'academic_agency_agent':
        $('#dialog-academic_agency_agent').kendoDialog({
          minWidth: 480,
          minHeight: 120,
          title: "使用者列表",
          content: '',
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {
              case 'add':
                mojo.json = { 'id': 0, 'username': $('#dialog-username').val(), 'agency_id': $('#dialog-agency_id').val(), 'email': $('#dialog-email').val() };
                break;
              case 'del':
                mojo.json = params;
                break;
              case 'mod':
                mojo.json = { 'id': params.id, 'username': params.username, 'agency_id': params.agency_id, 'email': $('#dialog-email').val() };
                break;
              }
              mojo.ajax('admin', key, val, mojo.json);
            }},
            { text: '取消'}
          ],
        });

        switch(val)
        {
        case 'add':
          mojo.html  = '<div><label for="dialog-agency_id">機構名稱</label><select id="dialog-agency_id" class="form-control"></select></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-username">使用者ID</label><input type="text" id="dialog-username" class="form-control" /></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-email">電子郵件信箱</label><input type="text" id="dialog-email" class="form-control" /></div>';
          $('#dialog-academic_agency_agent').data('kendoDialog').content(mojo.html).open().center();
          for (var x in mojo.refs.academic_agency) 
            $('#dialog-agency_id').append('<option value="' + x + '">' + mojo.refs.academic_institution[mojo.refs.academic_agency[x].institution_code].aka + ' ' + mojo.refs.academic_agency[x].cname + '</option>');
          break;
        case 'mod':
          mojo.html  = '<div><label for="dialog-agency_id">機構名稱</label><select id="dialog-agency_id" class="form-control"></select></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-username">使用者ID</label><input type="text" id="dialog-username" class="form-control" /></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-email">電子郵件信箱</label><input type="text" id="dialog-email" class="form-control" /></div>';
          $('#dialog-academic_agency_agent').data('kendoDialog').content(mojo.html).open().center();
          for (var x in mojo.refs.academic_agency) {
            if (x == params.agency_id)
              $('#dialog-agency_id').append('<option value="' + x + '" selected>' + mojo.refs.academic_institution[mojo.refs.academic_agency[x].institution_code].aka + ' ' + mojo.refs.academic_agency[x].cname + '</option>');
            else
              $('#dialog-agency_id').append('<option value="' + x + '">' + mojo.refs.academic_institution[mojo.refs.academic_agency[x].institution_code].aka + ' ' + mojo.refs.academic_agency[x].cname + '</option>');

          }
          $('#dialog-username').val(params.username).prop('disabled', true);
          $('#dialog-email').val(params.email);
          $('#dialog-agency_id').prop('disabled', true);
          break;
        case 'del':
          mojo.html = '<div><label class="warning">刪除使用者 ' + params.username + '？</label></div>';
          $('#dialog-academic_agency_agent').data('kendoDialog').content(mojo.html).open().center();
          break;
        } 
        break;
      }
    };

    mojo.watch_maintain = function() {
      mojo.ajax('refs', 'academic_institution', 'get');
      mojo.ajax('refs', 'academic_agency', 'get');
      $('#btn-academic_agency-add').on('click', function(e) {
        e.preventDefault();
        mojo.dialog_maintain('academic_agency', 'add');
      });
      $('.btn-academic_agency-mod').on('click', function(e) {
          e.preventDefault();
          var tr = $(e.target).closest("tr");
          var tds = $(tr).find("td");
          mojo.dialog_maintain( 'academic_agency', 'mod', {"id": $(tds[0]).html(), "institution_code": $(tds[1]).html(), "cname": $(tds[3]).html()} );
      });
      $('.btn-academic_agency-del').on('click', function(e) {
          e.preventDefault();
          var tr = $(e.target).closest("tr");
          var tds = $(tr).find("td");
          mojo.dialog_maintain( 'academic_agency', 'del', {"id": $(tds[0]).html(), "institution_code": $(tds[1]).html(), "cname": $(tds[3]).html()} );
      });

      $('#btn-academic_agency_agent-add').on('click', function(e) {
        e.preventDefault();
        mojo.dialog_maintain('academic_agency_agent', 'add');
      });
      $('.btn-academic_agency_agent-mod').on('click', function(e) {
          e.preventDefault();
          var tr = $(e.target).closest("tr");
          var tds = $(tr).find("td");
          mojo.dialog_maintain( 'academic_agency_agent', 'mod', {"id": $(tds[0]).html(), "agency_id": $(tds[1]).html(), "username": $(tds[2]).html(), "email": $(tds[3]).html()} );
      });
      $('.btn-academic_agency_agent-del').on('click', function(e) {
          e.preventDefault();
          var tr = $(e.target).closest("tr");
          var tds = $(tr).find("td");
          mojo.dialog_maintain( 'academic_agency_agent', 'del', {"id": $(tds[0]).html(), "agency_id": $(tds[1]).html(), "username": $(tds[2]).html()} );
      });

    };

    if (mojo.mojo_if('sec-maintain'))
      mojo.watch_maintain(); 
    /* unlock */
    mojo.dialog_admin_unlock = function(key, val, params) {
      switch(key)
      {
      case 'academic_agency_unlock':
        var m = moment();
        var online = m.get('year') + '-' + (parseInt(m.get('month')) + 1) + '-' + m.get('date');
        m.add((parseInt(params.work_days) + 1), 'days');
        var offline = m.get('year') + '-' + (parseInt(m.get('month')) + 1) + '-' + m.get('date');
        $('#dialog-academic_agency_unlock').kendoDialog({
          width: 480,
          title: "填報期間",
          content: '',
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {
              case 'yes':
              case 'no':
                mojo.json = { 'agency_id': params.agency_id, 'id': params.id, 'online': online, 'offline': offline };
                break;
              }
              mojo.ajax('admin', key, val, mojo.json);
            }},
            { text: '取消'}
          ]
        });

        switch(val)
        {
        case 'yes':
          mojo.html  = '<div><label>同意 ' + params.cname + ' 申請解鎖</label></div>';
          mojo.html += '<div><label>期間為 ' + online + ' ~ ' + offline + '</label></div>';
          break;
        case 'no':
          mojo.html  = '<div><label>不同意 ' + params.cname + ' 申請解鎖</label></div>';
          break;
        }
        $('#dialog-academic_agency_unlock').data('kendoDialog').content(mojo.html).open().center();
        break;
      }

    };

    mojo.watch_admin_unlock = function() {
      $('.btn-academic_agency_unlock-yes').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
console.log( '... yes' );
        mojo.dialog_admin_unlock('academic_agency_unlock', 'yes', {'agency_id': $(tds[0]).html(), 'id': $(tds[1]).html(), 'cname': $(tds[3]).html(), 'work_days': $(tds[7]).html()});
      });

      $('.btn-academic_agency_unlock-no').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.dialog_admin_unlock('academic_agency_unlock', 'no', {'agency_id': $(tds[0]).html(), 'id': $(tds[1]).html(), 'cname': $(tds[3]).html()});
      });
    };

    if (mojo.mojo_if('sec-admin_unlock'))
      mojo.watch_admin_unlock(); 

    /* settings */
    mojo.dialog_settings = function(key, val, params) {
      switch(key)
      {
      case 'academic_era':
        $('#dialog-academic_era').kendoDialog({
          width: 240,
          title: "填報期間",
          content: '',
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {
              case 'mod':
                mojo.json = { 'id': params.id, 'era_id': params.era_id, 'quarter': params.quarter, 'online': $('#dialog-online').val(), 'offline': $('#dialog-offline').val() }
                break;
              }
              mojo.ajax('admin', key, val, mojo.json);
            }},
            { text: '取消'}
          ],
        });

        switch(val)
        {
        case 'add':
          mojo.html  = '<div><label for="dialog-institution_code">新增學年?</label></div>';
          $('#dialog-academic_era').data('kendoDialog').content(mojo.html).open().center();
          break;
        case 'mod':
          mojo.html  = '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-cname">' + params.cname + '</div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-online">開放填寫</label><input type="text" id="dialog-online" class="form-control" /></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-online">結束填寫</label><input type="text" id="dialog-offline" class="form-control" /></div>';
          $('#dialog-academic_era').data('kendoDialog').content(mojo.html).open().center();
          $('#dialog-online').val(params.online).kendoDatePicker({format: "yyyy-MM-dd"}); 
          $('#dialog-offline').val(params.offline).kendoDatePicker({format: "yyyy-MM-dd"}); 
          break;
        } 
        break;
      case 'academic_class':
        $('#dialog-academic_class').kendoDialog({
          width: 240,
          title: "填報期間",
          content: '',
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {
              case 'add':
                mojo.json = { 'major': $('#dialog-major').val(), 'minro': $('#dialog-minor').val(), 'cname': $('#dialog-cname').val() }
                break;
              }
              mojo.ajax('admin', key, val, mojo.json);
            }},
            { text: '取消'}
          ],
        });

        switch(val)
        {
        case 'add':
          mojo.html  = '<div><label for="dialog-major">研習類別</label><select id="dialog-major"></select></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-minor">研習課程類別</label><input type="text" id="dialog-minor" /></div>';
          mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-cname">課程類別名稱</label><input type="text" id="dialog-cname" /></div>';
          $('#dialog-academic_class').data('kendoDialog').content(mojo.html).open().center();
          break;
        } 
        break;
      } 
    };

    mojo.watch_settings = function() {
      $('#btn-academic_era-add').on('click', function(e) {
        e.preventDefault();
        mojo.dialog_settings('academic_era', 'add');
      });

      $('#sel-academic_era').on('change', function(e) {
        mojo.dialog_settings('academic_era', 'sel', {'id': $(this).val()} );
      });

      $('.btn-academic_era-mod').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.dialog_settings( 'academic_era', 'mod', {'id': $(tds[0]).html(), 'era_id': $(tds[1]).html(), 'quarter': $(tds[2]).html(), 'cname': $(tds[3]).html(), 'online': $(tds[4]).html(), 'offline': $(tds[5]).html() } );
      });

      $('#btn-academic_class-add').on('click', function() {
        mojo.dialog_settings('academic_class', 'add');
      });

      $('#btn-academic_class-save').on('click', function() {
        params = {checks:[], picks:{}};
        $('#grid-academic_class-a tr').each( function(index) {
          var tds = $(this).find("td");
          if ($(tds[0]).find('input').hasClass('checkbox')) {
            if ($(tds[0]).find('input').is(':checked')) {
              params.checks.push($(tds[1]).html());
              params.picks[$(tds[1]).html()] = true;
            }
          }
        });
        $('#grid-academic_class-b tr').each( function(index) {
          var tds = $(this).find("td");
          if ($(tds[0]).find('input').hasClass('checkbox')) {
            if ($(tds[0]).find('input').is(':checked')) {
              params.checks.push($(tds[1]).html());
              params.picks[$(tds[1]).html()] = true;
            }
          }
        });
        $('#grid-academic_class-c tr').each( function(index) {
          var tds = $(this).find("td");
          if ($(tds[0]).find('input').hasClass('checkbox')) {
            if ($(tds[0]).find('input').is(':checked')) {
              params.checks.push($(tds[1]).html());
              params.picks[$(tds[1]).html()] = true;
            }
          }
        });
        mojo.ajax('admin', 'academic_class', 'mod', params);
      });

      $('#select-academic_class-era').on('change', function() {
        mojo.ajax('admin', 'academic_class', 'era');
      });
    };

    if (mojo.mojo_if('sec-settings'))
      mojo.watch_settings(); 

    /* =========================================== */
    /* ------------------- agent ------------------- */
    /* profile */
    mojo.dialog_agent = function() {
      $('#dialog').kendoDialog({
        minWidth: 480,
        title: "帳號維護",
        content: '',
        model: true,
        visible: false,
        closable: true,
        actions: [
          { text: '確定', primary: true, action: function(e) {
            mojo.json = { username: mojo.mojos[0], agency_id: mojo.mojos[2] };
            if (mojo.reg.email.test($('#dialog-email').val()))
              mojo.json.email = $('#dialog-email').val();
            if (mojo.reg.userpass.test($('#dialog-userpass').val()))
              mojo.json.userpass = $('#dialog-userpass').val();
            mojo.ajax('agent', 'profile', 'mod', mojo.json);
          }},
          { text: '取消'}
        ]
      });
      mojo.html = '';
      mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-email">信箱</label><input type="text" id="dialog-email" placeholder="需要修改的話請填入" /></div>';
      mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-userpass">密碼</label><input type="text" id="dialog-userpass" placeholder="需要修改的話請填入" /></div>';
      $('#dialog').data('kendoDialog').content(mojo.html).open().center();
    }
    
    mojo.watch_agent = function() {
      $('#btn-agent-profile').on('click', function(e) {
        e.preventDefault();
        mojo.dialog_agent();
      });
    }

    if (mojo.mojo_if('btn-agent-profile')) 
      mojo.watch_agent();
    /* fill */
    mojo.dialog_fill = function(key, val, params) {
        $('#dialog-academic_agency_class').kendoDialog({
          minWidth: 600,
          minHeight: 120,
          title: "績效填報",
          content: '',
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {
              case 'del':
                mojo.json = params;
                break;
              case 'done':
                break;
              }
              mojo.ajax('agent', key, val, mojo.json);
            }},
            { text: '取消'}
          ]
        });

        switch(val)
        {
        case 'done':
          break;
        case 'del':
          mojo.html = '<div><label class="warning">刪除 ' + params.cname + '？</label></div>';
          $('#dialog-academic_agency_class').data('kendoDialog').content(mojo.html).open().center();
          break;
        } 
    };

    mojo.watch_fill = function() {
      mojo.location_fillmod = function(params) {
        window.location = '/agent/fillmod/' + params;
      };
      mojo.grid.academic_agency_class = $('#grid-academic_agency_class');
      mojo.grid.academic_agency_class_a = $('#grid-academic_agency_class-a');
      mojo.grid.academic_agency_class_b = $('#grid-academic_agency_class-b');
      mojo.grid.academic_agency_class_c = $('#grid-academic_agency_class-c');
      mojo.grid.academic_agency_class_summary = $('#grid-academic_agency_class-summary');

      mojo.data.academic_agency_class_data_a = [];
      mojo.data.academic_agency_class_data_b = [];
      mojo.data.academic_agency_class_data_c = [];

      for (var i=0; i<mojo.data.academic_agency_class_data.length; i++) {
        switch(mojo.data.academic_agency_class_data[i].major_code)
        {
        case 'A':
          mojo.data.academic_agency_class_data_a.push(mojo.data.academic_agency_class_data[i]);
          break;
        case 'B':
          mojo.data.academic_agency_class_data_b.push(mojo.data.academic_agency_class_data[i]);
          break;
        case 'C':
          mojo.data.academic_agency_class_data_c.push(mojo.data.academic_agency_class_data[i]);
          break;
        }                                                                                                                                                                  
      }

      mojo.grid.academic_agency_class.kendoGrid({
        pageable: false,
        height: 0,
        columns: [
          { field: "cname", title: "研習類別", width: "300px" },
          { field: "people", title: "總人數", width: "120px" },
          { field: "reach", title: "總人次", width: "120px" },
          { field: "hours", title: "總時數", width: "120px" },
          { field: "turnover", title: "營收額度" }
        ],
        toolbar: kendo.template($('#template-academic_agency_class').html())
      });

      mojo.grid.academic_agency_class_a.kendoGrid({
        dataSource: {
          data: mojo.data.academic_agency_class_data_a,
          schema: {
            model: {
              id: "id",
              fields: {
                cname: { type: "string" },
                people: { type: "number" },
                reach: { type: "number" },
                hours: { type: "number" },
                turnover: { type: "number" }
              }    
            }    
          },
          aggregate: [
            { field: "people", aggregate: "sum" },
            { field: "reach", aggregate: "sum" },
            { field: "hours", aggregate: "sum" },
            { field: "turnover", aggregate: "sum" }
          ]    
        },   
        change: function(e) {
        },   
        remove: function(e) {
        },   
        pageable: false,
        columns: [
          { field: "id", title: "&nbsp;" },
          /*{ field: "cname", title: "第一類研習類別", width: "300px", footerTemplate: "第一類研習類別小計" },*/
          { field: "minor_cname", title: "第一類研習類別", width: "300px", footerTemplate: "第一類研習類別小計" },
          { field: "people", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-people-a" } },
          { field: "reach", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-reach-a" } },
          { field: "hours", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-hours-a" } },
          { field: "turnover", title: "&nbsp;", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-turnover-a" } },
          {
            title: '&nbsp;', width: '200px', 
            command: [
              {   
                name: '編輯',
                template: '<a class="k-button k-blank k-grid-edit btn-academic_agency_class-a-mod" title="編輯"><i class="fa fa-edit"></i></a>'
              },  
              {   
                name: '刪除',
                template: '<a class="k-button k-blank k-grid-delete btn-academic_agency_class-a-del" title="刪除"><i class="fa fa-trash"></i></a>'
              }   
            ]
          }
        ]
      });
      mojo.grid.academic_agency_class_a.data('kendoGrid').hideColumn(0);

      mojo.grid.academic_agency_class_b.kendoGrid({
        dataSource: {
          data: mojo.data.academic_agency_class_data_b,
          schema: {
            model: {
              id: "id",
              fields: {
                cname: { type: "string" },
                people: { type: "number" },
                reach: { type: "number" },
                hours: { type: "number" },
                turnover: { type: "number" }
              }    
            }    
          },   
          aggregate: [
            { field: "people", aggregate: "sum" },
            { field: "reach", aggregate: "sum" },
            { field: "hours", aggregate: "sum" },
            { field: "turnover", aggregate: "sum" }
          ]    
        },   
        change: function(e) {
        },   
        remove: function(e) {
        },   
        pageable: false,
        columns: [
          { field: "id", title: "&nbsp;" },
          { field: "minor_cname", title: "第二類研習類別", width: "300px", footerTemplate: "第二類研習類別小計" },
          { field: "people", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-people-b" } },
          { field: "reach", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-reach-b" } },
          { field: "hours", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-hours-b" } },
          { field: "turnover", title: "&nbsp;", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-turnover-b" } },
          {
            title: '&nbsp;', width: '200px', 
            command: [
              {   
                name: '編輯',
                template: '<a class="k-button k-blank k-grid-edit btn-academic_agency_class-b-mod" title="編輯"><i class="fa fa-edit"></i></a>'
              },  
              {   
                name: '刪除',
                template: '<a class="k-button k-blank k-grid-delete btn-academic_agency_class-b-del" title="刪除"><i class="fa fa-trash"></i></a>'
              }   
            ]
          }
        ]
      });
      mojo.grid.academic_agency_class_b.data('kendoGrid').hideColumn(0);

      mojo.grid.academic_agency_class_c.kendoGrid({
        dataSource: {
          data: mojo.data.academic_agency_class_data_c,
          schema: {
            model: {
              id: "id",        
              fields: {
                cname: { type: "string" },
                people: { type: "number" },
                reach: { type: "number" },
                hours: { type: "number" },
                turnover: { type: "number" }
              }    
            }    
          },   
          aggregate: [
            { field: "people", aggregate: "sum" },
            { field: "reach", aggregate: "sum" },
            { field: "hours", aggregate: "sum" },
            { field: "turnover", aggregate: "sum" }
          ]    
        },   
        change: function(e) {
        },   
        remove: function(e) {
        },   
        pageable: false,
        columns: [
          { field: "id", title: "&nbsp;" },
          { field: "minor_cname", title: "第三類研習類別", width: "300px", footerTemplate: "第三類研習類別小計" },
          { field: "people", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-people-c" } },
          { field: "reach", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-reach-c" } },
          { field: "hours", title: "&nbsp;", width: "120px", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-hours-c" } },
          { field: "turnover", title: "&nbsp;", footerTemplate: "#=sum#", footerAttributes: { "class": "summary-turnover" } },
          {
            title: '&nbsp;', width: '200px', 
            command: [
              {   
                name: '編輯',
                template: '<a class="k-button k-blank k-grid-edit btn-academic_agency_class-c-mod" title="編輯"><i class="fa fa-edit"></i></a>'
              },  
              {   
                name: '刪除',
                template: '<a class="k-button k-blank k-grid-delete btn-academic_agency_class-c-del" title="刪除"><i class="fa fa-trash"></i></a>'
              }   
            ]
          }
        ]
      });
      mojo.grid.academic_agency_class_c.data('kendoGrid').hideColumn(0);

      mojo.grid.academic_agency_class_summary.kendoGrid({
        pageable: false,
        height: 0,
        columns: [
          { field: "cname", title: "研習類別統計", width: "300px" },
          { field: "people", title: "總人數", width: "120px", footerAttributes: { "class": "summary-people" } },
          { field: "reach", title: "總人次", width: "120px", footerAttributes: { "class": "summary-reach" } },
          { field: "hours", title: "總時數", width: "120px", footerAttributes: { "class": "summary-hours" } },
          { field: "turnover", title: "營收額度", footerAttributes: { "class": "summary-turnover" } }
        ]
      });

      $('#select_academic_era_quarter').empty();
      for (var i=0; i<mojo.data.academic_agency_fill_data.length; i++)
        $('#select_academic_era_quarter').append('<option value="' + mojo.data.academic_agency_fill_data[i].id + '">' + mojo.data.academic_agency_fill_data[i].cname + '</option>');
      /*
      $('#select_academic_era_quarter').on('change', function(e) {
        
      });
      */

      $('#btn-academic_agency_class-done').on('click', function(e) {
        e.preventDefault();
        mojo.dialog_fill('academic_agency_class', 'done');
      });
      
      $('.btn-academic_agency_class-a-del').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.dialog_fill('academic_agency_class', 'del', {'id': $(tds[0]).html(), 'cname': $(tds[1]).html(), 'era_id': mojo.era_id, 'quarter': mojo.quarter, 'quarter_id': mojo.quarter_id, 'agency_id': mojo.mojos[2]});
      });

      $('.btn-academic_agency_class-b-del').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.dialog_fill('academic_agency_class', 'del', {'id': $(tds[0]).html(), 'cname': $(tds[1]).html(), 'era_id': mojo.era_id, 'quarter': mojo.quarter, 'quarter_id': mojo.quarter_id, 'agency_id': mojo.mojos[2]});
      });

      $('.btn-academic_agency_class-c-del').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.dialog_fill('academic_agency_class', 'del', {'id': $(tds[0]).html(), 'cname': $(tds[1]).html(), 'era_id': mojo.era_id, 'quarter': mojo.quarter, 'quarter_id': mojo.quarter_id, 'agency_id': mojo.mojos[2]});
      });
      
      $('.btn-academic_agency_class-a-mod').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.location_fillmod($(tds[0]).html());
      });

      $('.btn-academic_agency_class-b-mod').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.location_fillmod($(tds[0]).html());
      });

      $('.btn-academic_agency_class-c-mod').on('click', function(e) {
        e.preventDefault();
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.location_fillmod($(tds[0]).html());
      });
    };

    if (mojo.mojo_if('sec-fill'))
      mojo.watch_fill();

    /* fill add */
    mojo.check_filladd = function() {
      var pass = true;
      mojo.errmsg = '';
      if (!mojo.reg.string255.test($('#editor-cname').val())) {
        mojo.errmsg += '<p>課程名稱為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-weekly').val())) {
        mojo.errmsg += '<p>教學時數為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-weeks').val())) {
        mojo.errmsg += '<p>教學週數為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-revenue').val())) {
        mojo.errmsg += '<p>直接營收為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-subsidy').val())) {
        mojo.errmsg += '<p>政府補助為必填</p>';
        pass = false;
      }
      return pass;
    }

    mojo.dialog_filladd = function() {

    };

    mojo.watch_filladd = function() {
      mojo.ajax('refs', 'content_list', 'get')
      mojo.ajax('refs', 'country_list', 'get');
      mojo.ajax('refs', 'major_list', 'get');
      mojo.ajax('refs', 'minor_list', 'get');
      mojo.ajax('refs', 'target_list', 'get');
         
      mojo.major = $('#academic_agency_class').attr('data-mojo');

      mojo.summary = {
        weekly: 0,
        weeks: 0,
        adjust: 0,
        hours: 0,
        reach: 0,
        revenue: 0,
        subsidy: 0,
        turnover: 0
      };

      mojo.summaryHours = function() {
        mojo.summary.hours = mojo.summary.weekly * mojo.summary.weeks * mojo.summary.reach - mojo.summary.adjust;
        mojo.summary.hours = (mojo.summary.hours > 0)? mojo.summary.hours : 0;
        $('#summary-hours').html(mojo.summary.hours);
      }

      $('#editor-weekly').on('keyup', function(e) {
        mojo.summary.weekly = 0;
        if (!isNaN(parseInt($(this).val()))) 
          mojo.summary.weekly = parseFloat($(this).val());
        $('#summary-weekly').html(mojo.summary.weekly);
        mojo.summaryHours();
      });
        
      $('#editor-weeks').on('keyup', function(e) {
        mojo.summary.weeks = 0;
        if (!isNaN(parseInt($(this).val()))) 
          mojo.summary.weeks = parseFloat($(this).val());
        $('#summary-weeks').html(mojo.summary.weeks);
        mojo.summaryHours();
      });

      $('#editor-adjust').on('keyup', function(e) {
        mojo.summary.adjust = 0;
        if (!isNaN(parseInt($(this).val()))) 
          mojo.summary.adjust = parseFloat($(this).val());
        mojo.summaryHours();
      });

      $('#editor-revenue').on('keyup', function(e) {
        mojo.turnover = 0;
        if (!isNaN(parseInt($(this).val())))
          mojo.turnover = parseFloat($(this).val());
        if (!isNaN(parseInt($('#editor-subsidy').val())))
          mojo.turnover += parseFloat($('#editor-subsidy').val());
        $('#summary-turnover').html(mojo.turnover);
      });

      $('#editor-subsidy').on('keyup', function(e) {
        mojo.turnover = 0;
        if (!isNaN(parseInt($(this).val())))
          mojo.turnover = parseFloat($(this).val());
        if (!isNaN(parseInt($('#editor-revenue').val())))
          mojo.turnover += parseFloat($('#editor-revenue').val());
        $('#summary-turnover').html(mojo.turnover);
      });

      $('#btn-academic_agency_class-import').on('click', function(e) {
        e.preventDefault();

      });
    
      $('#btn-academic_agency_class-save').on('click', function(e) {
        e.preventDefault();
        if (mojo.check_filladd) {
          var adjust = 0,
              people = 0,
              reach = 0,
              hours = 0;
          if (!isNaN(parseFloat($('#editor-adjust').val())))
            adjust = $('#editor-adjust').val();
          if (!isNaN(parseInt($('#summary-reach').html())))
            reach = parseInt($('#summary-reach').html());
          if (!isNaN(parseFloat($('#summary-hours').html())))
            hours = parseFloat($('#summary-hours').html());
          mojo.json = {'agency_id': mojo.mojos[2], 'era_id': mojo.era_id, 'quarter': mojo.quarter, 'major_code': mojo.major, 'minor_code': $('#editor-minor_code').val(), 'cname': $('#editor-cname').val(), 'weekly': $('#editor-weekly').val(), 'weeks': $('#editor-weeks').val(), 'adjust': adjust, 'content_code': $('#editor-content').val(), 'target_code': $('#editor-target').val(), 'people': people, 'reach': reach, 'hours': hours, 'revenue': $('#editor-revenue').val(), 'subsidy': $('#editor-subsidy').val(), 'turnover': $('#summary-turnover').html(), 'note': $('#editor-note').val(), 'country': []}; 
    
          var data = mojo.grid.academic_agency_class_country.data('kendoGrid').dataSource.data();
console.log( data );
          for (var i=0; i<data.length; i++) {
            people += parseInt(data[i].male) + parseInt(data[i].female);
            mojo.json.country.push({'country_code': data[i].country_code.match(mojo.reg.country_code)[0], 'male': data[i].male, 'female': data[i].female, 'reach': data[i].reach, 'note': data[i].note});  
          }
          mojo.json.people = people;
          mojo.ajax('agent', 'academic_agency_class', 'add', mojo.json);
        } else 
            alert(mojo.errmsg);
      });


      mojo.data.academic_agency_class_country = [];

      mojo.academic_agency_class_country_list = function(container, options) {
        $('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoAutoComplete({
          dataSource: mojo.refs.country_code_list,
          dataTextField: "country_code",
          placeholder: '中／英文國名／代碼',
          template: '<span class="k-state-default">#:data.cname#</span>&nbsp;<span class="k-state-default">#:data.ename#</span>',
          filter: "contains",
          minLength: 1
        }).data('kendoAutoComplete');
      };
      
      /* excel */
      
      $("#academic_agency_country-import").on('click', function(e) {
        e.preventDefault();
      });

      mojo.grid.academic_agency_class_country = $('#grid-academic_agency_class_country');
      mojo.count = 0;
      mojo.grid.academic_agency_class_country.kendoGrid({
        pageable: false,
        autoBind: false,
        dataSource: {
          data: mojo.data.academic_agency_class_country,
          schema: {
            model: {
              id: "country_code",
              fields: {
                country_code: { type: "string", validation: { required: true } },
                male: { type: "number", validation: { min: 0, required: true } },
                female: { type: "number", validation: { min: 0, required: true } },
                reach: { type: "number", validation: { min: 0, required: true } },
                note: { type: "string" }
              }
            }
          },
          aggregate: [
            { field: "male", aggregate: "sum" },
            { field: "female", aggregate: "sum" },
            { field: "reach", aggregate: "sum" }
          ]
        },
        change: function(e) {
        },
        edit: function(e) {
        },
        remove: function(e) {
            mojo.tag = 'summary-country_reach';
            mojo.flag = true;
        },
        save: function(e) {
            mojo.tag = 'summary-country_reach';
            mojo.flag = true;
        },
        dataBound: mojo.onDataBound,
        dataBinding: mojo.onDataBinding,
        columns: [
          { field: "country_code", title: "國別", width: "200px", editor: mojo.academic_agency_class_country_list, footerTemplate: " 人數小計" },
          { field: "male", title: "男新生人數", aggregates: ["sum"], attributes: { "class": "country_male" }, footerTemplate: "#=sum#", footerAttributes: { "class": "summary-country_male" } },
          { field: "female", title: "女新生人數", aggregates: ["sum"], attributes: { "class": "country_female" }, footerTemplate: "#=sum#", footerAttributes: { "class": "summary-country_female" } },
          { field: "reach", title: "人次", aggregates: ["reach"], attributes: { "class": "country_reach" }, footerTemplate: "#=sum#", footerAttributes: { "class": "summary-country_reach" } },
          { field: "note", title: "其他" }, 
          { title: "&nbsp;", width: "200px", 
            command: [
              {   
                name: '編輯',
                template: '<a class="k-button k-blank k-grid-edit btn-academic_agency_class_country-mod" title="修改"><i class="fa fa-edit"></i></a>'
              },  
              {   
                name: '刪除',
                template: '<a class="k-button k-blank k-grid-delete btn-academic_agency_class_country-del" title="刪除"><i class="fa fa-trash"></i></a>'
              } 
            ]
          }
        ],
        toolbar: kendo.template($('#template-academic_agency_class_country').html()),
        editable: "popup"
      });
    };
      
    if (mojo.mojo_if('sec-filladd'))
      mojo.watch_filladd();

    /* fill mod */

    mojo.check_fillmod = function() {
      var pass = true;
      mojo.errmsg = '';
      if (!mojo.reg.string255.test($('#editor-cname').val())) {
        mojo.errmsg += '<p>課程名稱為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-weekly').val())) {
        mojo.errmsg += '<p>教學時數為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-weeks').val())) {
        mojo.errmsg += '<p>教學週數為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-revenue').val())) {
        mojo.errmsg += '<p>直接營收為必填</p>';
        pass = false;
      }
      if (!mojo.reg.float31.test($('#editor-subsidy').val())) {
        mojo.errmsg += '<p>政府補助為必填</p>';
        pass = false;
      }
      return pass;
    }

    mojo.dialog_fillmod = function() {

    };

    mojo.watch_fillmod = function() {
      mojo.ajax('refs', 'content_list', 'get')
      mojo.ajax('refs', 'country_list', 'get');
      mojo.ajax('refs', 'major_list', 'get');
      mojo.ajax('refs', 'minor_list', 'get');
      mojo.ajax('refs', 'target_list', 'get');
         
      mojo.class_id = $('#academic_agency_class').attr('data-mojo');

      mojo.summary = {
        weekly: 0,
        weeks: 0,
        adjust: 0,
        hours: 0,
        reach: 0,
        revenue: 0,
        subsidy: 0,
        turnover: 0
      };

      mojo.summaryHours = function() {
        mojo.summary.hours = mojo.summary.weekly * mojo.summary.weeks * mojo.summary.reach - mojo.summary.adjust;
        mojo.summary.hours = (mojo.summary.hours > 0)? mojo.summary.hours : 0;
        $('#summary-hours').html(mojo.summary.hours);
      }

      $('#editor-weekly').on('keyup', function(e) {
        mojo.summary.weekly = 0;
        if (!isNaN(parseInt($(this).val()))) 
          mojo.summary.weekly = parseFloat($(this).val());
        $('#summary-weekly').html(mojo.summary.weekly);
        mojo.summaryHours();
      });
        
      $('#editor-weeks').on('keyup', function(e) {
        mojo.summary.weeks = 0;
        if (!isNaN(parseInt($(this).val()))) 
          mojo.summary.weeks = parseFloat($(this).val());
        $('#summary-weeks').html(mojo.summary.weeks);
        mojo.summaryHours();
      });

      $('#editor-adjust').on('keyup', function(e) {
        mojo.summary.adjust = 0;
        if (!isNaN(parseInt($(this).val()))) 
          mojo.summary.adjust = parseFloat($(this).val());
        mojo.summaryHours();
      });

      $('#editor-revenue').on('keyup', function(e) {
        mojo.turnover = 0;
        if (!isNaN(parseInt($(this).val())))
          mojo.turnover = parseFloat($(this).val());
        if (!isNaN(parseInt($('#editor-subsidy').val())))
          mojo.turnover += parseFloat($('#editor-subsidy').val());
        $('#summary-turnover').html(mojo.turnover);
      });

      $('#editor-subsidy').on('keyup', function(e) {
        mojo.turnover = 0;
        if (!isNaN(parseInt($(this).val())))
          mojo.turnover = parseFloat($(this).val());
        if (!isNaN(parseInt($('#editor-revenue').val())))
          mojo.turnover += parseFloat($('#editor-revenue').val());
        $('#summary-turnover').html(mojo.turnover);
      });

      $('#btn-academic_agency_class-import').on('click', function(e) {
        e.preventDefault();
      });
    
      $('#btn-academic_agency_class-save').on('click', function(e) {
        e.preventDefault();
        if (mojo.check_fillmod) {
          var adjust = 0,
              people = 0,
              reach = 0,
              hours = 0;
          if (!isNaN(parseFloat($('#editor-adjust').val())))
            adjust = $('#editor-adjust').val();
          if (!isNaN(parseInt($('#summary-reach').html())))
            reach = parseInt($('#summary-reach').html());
          if (!isNaN(parseFloat($('#summary-hours').html())))
            hours = parseFloat($('#summary-hours').html());
          mojo.json = {'agency_id': mojo.mojos[2], 'class_id': mojo.class_id, 'era_id': mojo.era_id, 'quarter': mojo.quarter, 'minor_code': $('#editor-minor_code').val(), 'cname': $('#editor-cname').val(), 'weekly': $('#editor-weekly').val(), 'weeks': $('#editor-weeks').val(), 'adjust': adjust, 'content_code': $('#editor-content').val(), 'target_code': $('#editor-target').val(), 'people': people, 'reach': reach, 'hours': hours, 'revenue': $('#editor-revenue').val(), 'subsidy': $('#editor-subsidy').val(), 'turnover': $('#summary-turnover').html(), 'note': $('#editor-note').val(), 'country': []}; 
    
          var data = mojo.grid.academic_agency_class_country.data('kendoGrid').dataSource.data();
//console.log( data );
          for (var i=0; i<data.length; i++) {
            people += parseInt(data[i].male) + parseInt(data[i].female);
            mojo.json.country.push({'country_code': data[i].country_code.match(mojo.reg.country_code)[0], 'male': data[i].male, 'female': data[i].female, 'reach': data[i].reach, 'note': data[i].note});  
          }
          mojo.json.people = people;
          mojo.ajax('agent', 'academic_agency_class', 'mod', mojo.json);
        } else 
            alert(mojo.errmsg);
      });

      mojo.academic_agency_class_country_list = function(container, options) {
        $('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoAutoComplete({
          dataSource: mojo.refs.country_code_list,
          dataTextField: "country_code",
          placeholder: '中／英文國名／代碼',
          template: '<span class="k-state-default">#:data.cname#</span>&nbsp;<span class="k-state-default">#:data.ename#</span>',
          filter: "contains",
          minLength: 1
        }).data('kendoAutoComplete');
      };
      
      /* excel */
      
      $("#academic_agency_country-import").on('click', function(e) {
        e.preventDefault();
      });

      mojo.grid.academic_agency_class_country = $('#grid-academic_agency_class_country');
      mojo.grid.academic_agency_class_country.kendoGrid({
        pageable: false,
        dataSource: {
          data: mojo.data.academic_agency_class_country,
          schema: {
            model: {
              id: "country_code",
              fields: {
                country_code: { type: "string", validation: { required: true } },
                male: { type: "number", validation: { min: 0, required: true } },
                female: { type: "number", validation: { min: 0, required: true } },
                reach: { type: "number", validation: { min: 0, required: true } },
                note: { type: "string" }
              }
            }
          },
          aggregate: [
            { field: "male", aggregate: "sum" },
            { field: "female", aggregate: "sum" },
            { field: "reach", aggregate: "sum" }
          ]
        },
        change: function(e) {
console.log('!!!');
        },
        edit: function(e) {
console.log('???');
        },
        remove: function(e) {
            mojo.tag = 'summary-country_reach';
            mojo.flag = true;
        },
        save: function(e) {
            mojo.tag = 'summary-country_reach';
            mojo.flag = true;
        },
        dataBound: mojo.onDataBound,
        dataBinding: mojo.onDataBinding,
        columns: [
          { field: "country_code", title: "國別", width: "200px", editor: mojo.academic_agency_class_country_list, footerTemplate: " 人數小計" },
          { field: "male", title: "男新生人數", aggregates: ["sum"], attributes: { "class": "country_male" }, footerTemplate: "#=sum#", footerAttributes: { "class": "summary-country_male" } },
          { field: "female", title: "女新生人數", aggregates: ["sum"], attributes: { "class": "country_female" }, footerTemplate: "#=sum#", footerAttributes: { "class": "summary-country_female" } },
          { field: "reach", title: "人次", aggregates: ["reach"], attributes: { "class": "country_reach" }, footerTemplate: "#=sum#", footerAttributes: { "class": "summary-country_reach" } },
          { field: "note", title: "其他" }, 
          { title: "&nbsp;", width: "200px", 
            command: [
              {   
                name: '編輯',
                template: '<a class="k-button k-blank k-grid-edit btn-academic_agency_class_country-mod" title="修改"><i class="fa fa-edit"></i></a>'
              },  
              {   
                name: '刪除',
                template: '<a class="k-button k-blank k-grid-delete btn-academic_agency_class_country-del" title="刪除"><i class="fa fa-trash"></i></a>'
              } 
            ]
          }
        ],
        toolbar: kendo.template($('#template-academic_agency_class_country').html()),
        editable: "popup"
      });

      if (mojo.data.academic_agency_class) {
        $('#editor-cname').val(mojo.data.academic_agency_class[0].cname);
        $('#editor-weekly').val(mojo.data.academic_agency_class[0].weekly);
        $('#editor-weeks').val(mojo.data.academic_agency_class[0].weeks);
        $('#editor-adjust').val(mojo.data.academic_agency_class[0].adjust);
        $('#editor-revenue').val(mojo.data.academic_agency_class[0].revenue);
        $('#editor-subsidy').val(mojo.data.academic_agency_class[0].subsidy);
        $('#editor-note').val(mojo.data.academic_agency_class[0].note);
        $('#summary-weekly').html(mojo.data.academic_agency_class[0].weekly);
        $('#summary-reach').html(mojo.data.academic_agency_class[0].reach);
        $('#summary-weeks').html(mojo.data.academic_agency_class[0].weeks);
        $('#summary-hours').html(mojo.data.academic_agency_class[0].hours);
        $('#summary-turnover').html(mojo.data.academic_agency_class[0].turnover);
      }
    };

    if (mojo.mojo_if('sec-fillmod'))
      mojo.watch_fillmod();
    /* info */
    mojo.dialog_info = function(key, val, params) {
      switch(key) 
      {   
      case 'academic_agency_hr':
        $('#dialog-academic_agency_hr').kendoDialog({
          width: 480,
          title: params.academic_era_code + " 教學人力",
          content: '', 
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {   
              case 'add':
                mojo.json = {'agency_id': mojo.mojos[2], 'administration': $('#dialog-administration').val(), 'subject': $('#dialog-subject').val(), 'adjunct': $('#dialog-adjunct').val(), 'reserve': $('#dialog-reserve').val(), 'others': $('#dialog-others').val(), 'note': $('#dialog-note').val()};
                break;
              case 'mod':
                mojo.json = {'agency_id': mojo.mojos[2], 'era_id': params.era_id, 'academic_era_code': params.academic_era_code, 'administration': $('#dialog-administration').val(), 'subject': $('#dialog-subject').val(), 'adjunct': $('#dialog-adjunct').val(), 'reserve': $('#dialog-reserve').val(), 'others': $('#dialog-others').val(), 'note': $('#dialog-note').val()};
                break;
              }   
              mojo.ajax('agent', key, val, mojo.json);
            }}, 
            { text: '取消'}
          ],  
        }); 

        mojo.html  = '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-administration">行政人員</label><input type="text" id="dialog-administration" class="form-control" /></div>';
        mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-subject">專任教師</label><input type="text" id="dialog-subject" class="form-control" /></div>';
        mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-adjunct">兼任教師</label><input type="text" id="dialog-adjunct" class="form-control" /></div>';
        mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-reserve">儲備教師</label><input type="text" id="dialog-reserve" class="form-control" /></div>';
        mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-others">其他教師</label><input type="text" id="dialog-others" class="form-control" /></div>';
        mojo.html += '<div class="k-textbox k-textbox-full k-space-right"><label for="dialog-note">備註</label><input type="text" id="dialog-note" class="form-control" /></div>';
        $('#dialog-academic_agency_hr').data('kendoDialog').content(mojo.html).open().center();
        switch(val)
        {   
        case 'mod':
          $('#dialog-administration').val(params.administration);
          $('#dialog-subject').val(params.subject);
          $('#dialog-adjunct').val(params.adjunct);
          $('#dialog-reserve').val(params.reserve);
          $('#dialog-others').val(params.others);
          $('#dialog-note').val(params.note);
          break;
        }   
        break;
      case 'academic_agency_contact':
        $('#dialog-academic_agency_contact').kendoDialog({
          width: 600,
          title: "聯絡人",
          content: '', 
          model: true,
          visible: false,
          closable: true,
          actions: [
            { text: '確定', primary: true, action: function(e) {
              switch(val) 
              {   
              case 'add':
              case 'mod':
                mojo.json = {'agency_id': mojo.mojos[2], 'id': params.id, 'cname': $('#dialog-cname').val(), 'title': $('#dialog-title').val(), 'manager': ($('#dialog-manager').is(':checked'))? 1 : 0, 'staff': ($('#dialog-staff').is(':checked'))? 1 : 0, 'role': $('#dialog-role').val(), 'area_code': $('#dialog-area_code').val(), 'phone': $('#dialog-phone').val(), 'ext': $('#dialog-ext').val(), 'email': $('#dialog-email').val(), 'spare_email': $('#dialog-spare_email').val(), 'primary': ($('#dialog-primary').is(':checked'))? 1 : 0};  
                break;
              }   
console.log( mojo.json );
              mojo.ajax('agent', key, val, mojo.json);
            }}, 
            { text: '取消'}
          ],  
        }); 

        mojo.html  = '<div class="col-xs-12" ><label for="dialog-cname">姓名</label><input type="text" id="dialog-cname" class="form-control" /></div>';
        mojo.html += '<div class="col-xs-12" ><label for="dialog-title">職稱</label><input type="text" id="dialog-title" class="form-control" /></div>';
        mojo.html += '<div class="col-xs-12" ><label for="dialog-manager">單位主管</label><input type="checkbox" id="dialog-manager" class="form-control" /></div>';
        mojo.html += '<div class="col-xs-12" ><label for="dialog-staff">單位職員</label><input type="checkbox" id="dialog-staff" class="form-control" /></div>';
        mojo.html += '<div class="col-xs-12" ><label for="dialog-role">聘用身份</label><input type="text" id="dialog-role" class="form-control" /></div>';
        mojo.html += '<div class="col-xs-12" ><label>電話</label>&nbsp;<select id="dialog-area_code"></select>&nbsp;<input type="text" id="dialog-phone" class="" placeholder="電話" size="10" />&nbsp;<input type="text" id="dialog-ext" class="" placeholder="分機" size="6" /></div>';
        mojo.html += '<div class="col-xs-12" ><label for="dialog-email">信箱</label><input type="text" id="dialog-email" class="form-control" /></div>';
        mojo.html += '<div class="col-xs-12" ><label for="dialog-spare_email">備用信箱</label><input type="text" id="dialog-spare_email" class="form-control" /></div>';
        mojo.html += '<div class="col-xs-12" ><label for="dialog-primary">主要聯絡人</label><input type="checkbox" id="dialog-primary" class="form-control" /></div>';
        $('#dialog-academic_agency_contact').data('kendoDialog').content(mojo.html).open().center();
        for (var x in mojo.refs.area_list)
          $('#dialog-area_code').append('<option value="' + x + '">' + x + '(' + mojo.refs.area_list[x] + ')</option>');
        switch(val)
        {   
        case 'mod':
console.log( params );
          $('#dialog-cname').val(params.cname);
          $('#dialog-title').val(params.title);
          if (1 == params.manager)
            $('#dialog-manager').prop(':checked', true);
          if (1 == params.statff)
            $('#dialog-staff').prop(':checked', true);
          $('#dialog-role').val(params.role);
          $('#dialog-area_code').val(params.area_code);
          $('#dialog-phone').val(params.phone);
          $('#dialog-ext').val(params.ext);
          $('#dialog-email').val(params.email);
          $('#dialog-spare_email').val(params.spare_email);
          if (1 == params.primary)
            $('#dialog-primary').prop(':checked', true);
          break;
        }   
        break;
      }
    };

    mojo.watch_info = function() {
      mojo.ajax('refs', 'area_list', 'get');
      $('#btn-academic_agency-mod').on('click', function(e) {
        e.preventDefault(); 
        mojo.json = {'id': mojo.mojos[2], 'cname': $('#academic_agency_cname').val(), 'zipcode': $('#academic_agency_zipcode').val(), 'address': $('#academic_agency_address').val(), 'established': $('#academic_agency_established').val(), 'approval': $('#academic_agency_approval').val(), 'note': $('#academic_agency_note').val()};
        mojo.ajax('agent', 'academic_agency', 'mod', mojo.json);
      });

      $('#btn-academic_agency_hr-add').on('click', function(e) {
        e.preventDefault(); 
        mojo.ajax('agent', 'academic_agency_hr', 'add', {'agency_id': mojo.mojos[2]});
      });

      $('.btn-academic_agency_hr-mod').on('click', function(e) {
        e.preventDefault(); 
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.json = {'agency_id': $(tds[0]).html(), 'era_id': $(tds[1]).html(), 'academic_era_code': $(tds[2]).html(), 'administration': $(tds[3]).html(), 'subject': $(tds[4]).html(), 'adjunct': $(tds[5]).html(), 'reserve': $(tds[6]).html(), 'others': $(tds[7]).html(), 'note': $(tds[8]).html()};
        mojo.dialog_info('academic_agency_hr', 'mod', mojo.json);
      });

      $('#btn-academic_agency_contact-add').on('click', function(e) {
        e.preventDefault(); 
        
        mojo.dialog_info('academic_agency_contact', 'add', {'id': 0});
      });

      $('.btn-academic_agency_contact-mod').on('click', function(e) {
        e.preventDefault(); 
        var tr = $(e.target).closest("tr");
        var tds = $(tr).find("td");
        mojo.json = {'id': $(tds[0]).html(), 'agency_id': $(tds[1]).html(), 'cname': $(tds[2]).html(), 'title': $(tds[3]).html(), 'manager': $(tds[4]).html(), 'staff': $(tds[5]).html(), 'role': $(tds[6]).html(), 'area_code': $(tds[7]).html(), 'phone': $(tds[8]).html(), 'ext': $(tds[9]).html(), 'email': $(tds[11]).html(), 'spare_email': $(tds[12]).html(), 'primary': $(tds[13]).html()};
        mojo.dialog_info('academic_agency_contact', 'mod', mojo.json);
      });

      $('.btn-academic_agency_contact-del').on('click', function(e) {
        e.preventDefault(); 
        mojo.dialog_info('academic_agency_contact', 'del');
      });
    };

    if (mojo.mojo_if('sec-info'))
      mojo.watch_info();

    /* unlock */
    mojo.dialog_agency_unlock = function(key, val, params) {

    }

    mojo.watch_agency_unlock = function() {
      if (mojo.data.academic_agency_unlock.length) {
       console.log(mojo.data.academic_agency_unlock); 
        $('#editor-academic_era').val(mojo.data.academic_agency_unlock[0]['era_id']);
        $('#editor-academic_era_quarter').val(mojo.data.academic_agency_unlock[0]['quarter']);
        $('#editor-academic_class-note').val(mojo.data.academic_agency_unlock[0]['note']);
        $('#editor-academic_class-work_days').val(mojo.data.academic_agency_unlock[0]['work_days']);

        var minors = mojo.data.academic_agency_unlock[0]['minors'].split(',');
        $('#grid-academic_class-a table tbody tr').each(function(e) {
          if (minors.indexOf($(this).find('td:eq(1)').html()) != -1) {
            $(this).addClass('k-state-selected');
            $(this).find('td:eq(0) input:checkbox').prop('checked', true);
          }
        });
        $('#grid-academic_class-b table tbody tr').each(function(e) {
          if (minors.indexOf($(this).find('td:eq(1)').html()) != -1) {
            $(this).addClass('k-state-selected');
            $(this).find('td:eq(0) input:checkbox').prop('checked', true);
          }
        });
        $('#grid-academic_class-c table tbody tr').each(function(e) {
          if (minors.indexOf($(this).find('td:eq(1)').html()) != -1) {
            $(this).addClass('k-state-selected');
            $(this).find('td:eq(0) input:checkbox').prop('checked', true);
          }
        });
      }

      $('#grid-academic_class-a table tbody tr').on('click', function(e) {
        if ($(this).hasClass('k-state-selected')) {
          $(this).removeClass('k-state-selected');
          $(this).find('td:eq(0) input:checkbox').prop('checked', false);
        } else {
          $(this).addClass('k-state-selected');
          $(this).find('td:eq(0) input:checkbox').prop('checked', true);
        }
      });

      $('#grid-academic_class-b table tbody tr').on('click', function(e) {
        if ($(this).hasClass('k-state-selected')) {
          $(this).removeClass('k-state-selected');
          $(this).find('td:eq(0) input:checkbox').prop('checked', false);
        } else {
          $(this).addClass('k-state-selected');
          $(this).find('td:eq(0) input:checkbox').prop('checked', true);
        }
      });

      $('#grid-academic_class-c table tbody tr').on('click', function(e) {
        if ($(this).hasClass('k-state-selected')) {
          $(this).removeClass('k-state-selected');
          $(this).find('td:eq(0) input:checkbox').prop('checked', false);
        } else {
          $(this).addClass('k-state-selected');
          $(this).find('td:eq(0) input:checkbox').prop('checked', true);
        }
      });

      $('#btn-academic_class-unlock').on('click', function(e) {
        e.preventDefault();
        mojo.json = {'agency_id': mojo.mojos[2], 'era_id': $('#editor-academic_era').val(), 'quarter': $('#editor-academic_era_quarter').val(), 'note': $('#editor-academic_class-note').val(), 'work_days': $('#editor-academic_class-work_days').val()};
        var minors = [];
        $('#grid-academic_class-a table tbody tr').each(function( index ) {
          if ($(this).hasClass('k-state-selected'))
            minors.push($(this).find('td:eq(1)').html());
        });
        $('#grid-academic_class-b table tbody tr').each(function( index ) {
          if ($(this).hasClass('k-state-selected'))
            minors.push($(this).find('td:eq(1)').html());
        });
        $('#grid-academic_class-c table tbody tr').each(function( index ) {
          if ($(this).hasClass('k-state-selected'))
            minors.push($(this).find('td:eq(1)').html());
        });
        mojo.json.minors = minors.join(',');
        mojo.ajax('agent', 'academic_agency_unlock', 'mod', mojo.json);
      });
    };

    if (mojo.mojo_if('sec-agency_unlock'))
      mojo.watch_agency_unlock();
  });
})(jQuery);

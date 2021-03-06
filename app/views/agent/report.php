<section id="sec-agency_report">
    <div class="container">
    <?php if ($_SESSION['agent']) : ?>
      <div id="grid-academic_agency_report_search">
        <table role="grid">
          <colgroup><col style="width: 10%"/><col style="width: 20%;" /><col /></colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <td><select id="academic_agency_report-era"></select></td>
              <td><select id="academic_agency_report-quarter"></select></td>
              <td><a href="#" class="btn btn-lg btn-primary" id="btn-academic_agency_report-search"><span class="fa fa-search"></span>查詢報表</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="nav nav-tabs" role="tablist">
        <li class="active" role="presentation"><a id="tab-academic_agency_report_summary" href="#academic_agency_report_summary" aria-controls="academic_agency_report_summary" role="tab" data-toggle="tab">課程統計簡表(四大類)</a></li>
        <li role="presentation"><a id="tab-academic_agency_report_detail" href="#academic_agency_report_detail" aria-controls="academic_agency_report_detail" role="tab" data-toggle="tab">課程明細詳表(含國別)</a></li>
        <li role="presentation"><a id="tab-academic_agency_report_pdf" href="#academic_agency_report_pdf" aria-controls="academic_agency_report_pdf" role="tab" data-toggle="tab">績效報表</a></li>
        <li role="presentation"><a id="tab-academic_agency_report_taken" href="#academic_agency_report_taken" aria-controls="academic_agency_report_taken" role="tab" data-toggle="tab">績效認列類別</a></li>
      </ul>    
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="academic_agency_report_summary">
          <script type="text/x-kendo-template" id="template-academic_agency_report_summary">
            <div class="createBtnContainer"><a href="\\#" class="k-button" id="btn-academic_agency_report_summary-export"><span class="fa fa-file-excel-o"></span>&nbsp;匯出EXCEL</a></div>
            <div class="toolbar"></div>
          </script>
          <div id="grid-academic_agency_report_summary"></div>
        </div>
        <div role="tabpanel" class="tab-pane" id="academic_agency_report_detail">
          <script type="text/x-kendo-template" id="template-academic_agency_report_detail">
            <div class="createBtnContainer"><a href="\\#" class="k-button" id="btn-academic_agency_report_detail-export"><span class="fa fa-file-excel-o"></span>&nbsp;匯出EXCEL</a></div>
            <div class="toolbar"></div>
          </script>
          <div id="grid-academic_agency_report_detail"></div>
        </div>
        <div role="tabpanel" class="tab-pane" id="academic_agency_report_pdf">
          <script type="text/x-kendo-template" id="template-academic_agency_report_pdf">
            <div class="createBtnContainer"><a href="\\#" class="k-button" id="btn-academic_agency_report_pdf-export"><span class="fa fa-file-pdf-o"></span>&nbsp;匯出PDF</a></div>
            <div class="toolbar"></div>
          </script>
          <div id="grid-academic_agency_report_pdf"></div>
        </div>
        <div role="tabpanel" class="tab-pane" id="academic_agency_report_taken">
          <script type="text/x-kendo-template" id="template-academic_agency_report_taken">
            <div class="toolbar"></div>
          </script>
          <div id="grid-academic_agency_report_taken"></div>
        </div>
      </div>
      <script>
        mojo.data.institution_code = '<?php echo $institution_code; ?>';
        mojo.data.academic_era = JSON.parse('<?php echo json_encode($academic_era); ?>');
        mojo.data.academic_era_quarter = [
          {quarter: 10, cname: '第1季~第4季(年度)'},
          {quarter: 1, cname: '第1季'},
          {quarter: 2, cname: '第2季'},
          {quarter: 3, cname: '第3季'},
          {quarter: 4, cname: '第4季'},
          {quarter: 5, cname: '第1季~第2季'},
          {quarter: 6, cname: '第2季~第3季'},
          {quarter: 7, cname: '第3季~第4季'},
          {quarter: 8, cname: '第1季~第3季'},
          {quarter: 9, cname: '第2季~第4季'}
        ];
        for (var i=0; i<mojo.data.academic_era.length; i++)
          $('#academic_agency_report-era').append('<option value="' + mojo.data.academic_era[i]['id'] + '">' + mojo.data.academic_era[i]['cname'] + '</option>');
        for (var i=0; i<mojo.data.academic_era_quarter.length; i++) 
          $('#academic_agency_report-quarter').append('<option value="' + mojo.data.academic_era_quarter[i]['quarter'] + '">' + mojo.data.academic_era_quarter[i]['cname'] + '</option>');
        
      </script>
    <?php endif; ?>
    </div>
</section>

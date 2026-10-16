/* ============================================================
   Budget projector — Sendero Homes estimating tool demo.

   COSTCATS is [code, name, share of total spend, jobs observed].
   Each share is the mean percentage across the eight historical
   jobs loaded into the database. No Sendero pricing ships here:
   the reader supplies the cost basis, and only the percentage
   structure is baked in.

   Markup it expects:  #t-sqft #t-rate #t-total #t-bars #t-toggle #t-shown
   ============================================================ */
var COSTCATS=[["6300","Exterior Structures",0.10588,8],["4500","Windows and Doors",0.08051,8],["5400","Cabinets",0.07744,8],["3100","Framing Materials",0.06991,8],["6100","Landscaping and Irrigation",0.05679,8],["5100","Flooring",0.05024,8],["2100","Footings/Foundations",0.04787,8],["3700","Electrical",0.04776,8],["3600","Plumbing",0.03669,8],["3150","Framing Labor",0.03242,8],["4000","Roofing",0.03099,8],["4900","Painting",0.02866,8],["5300","Countertops",0.02591,8],["8500","Contingency",0.02445,8],["5500","Appliances",0.02375,8],["5000","Drywall",0.02307,8],["5200","Trim Materials & Labor",0.02287,8],["3000","Structural Steel",0.02003,8],["5050","Stucco",0.01808,8],["3900","Low Voltage",0.01772,8],["4100","Masonry",0.01744,8],["3800","HVAC",0.01711,8],["1200","Site Work",0.01432,8],["1400","Utility Connections",0.01381,8],["9000","PM & Admin Fees",0.01323,8],["4800","Balcony",0.01296,2],["6200","Driveway/Flatwork",0.01035,8],["6000","Cleanup",0.00908,8],["4200","Fireplace",0.009,8],["1100","Architectural / Engineering",0.00729,8],["1000","Permits and Fees",0.00714,8],["9990","Insurance",0.00709,6],["4700","Insulation",0.00674,8],["5900","Mirrors/Shower Doors",0.00578,8],["4600","Wine Room",0.00454,8],["9500","Field Equipment",0.00084,8],["3500","Sheet Metal",0.00071,8],["6500","Inspections",0.0006,8],["5270","Hardware & Supplies",0.00048,8],["2300","Termite Protection",0.00045,8]];

(function () {
  'use strict';
  var sqft = document.getElementById('t-sqft');
  var rate = document.getElementById('t-rate');
  var totalEl = document.getElementById('t-total');
  var barsEl = document.getElementById('t-bars');
  var toggle = document.getElementById('t-toggle');
  var shownEl = document.getElementById('t-shown');
  if (!sqft || !rate || !totalEl || !barsEl) return;

  var expanded = false;
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  });

  function render() {
    var area = parseFloat(sqft.value) || 0;
    var basis = parseFloat(rate.value) || 0;
    var total = area * basis;
    totalEl.textContent = money.format(total);

    var list = expanded ? COSTCATS : COSTCATS.slice(0, 12);
    var top = COSTCATS[0][2] || 1;
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      var w = Math.max(1, (c[2] / top) * 100);
      html += '<div class="bar">'
           +    '<span class="code">' + c[0] + '</span>'
           +    '<span class="nm">' + c[1] + '</span>'
           +    '<span class="track"><i style="width:' + w.toFixed(1) + '%"></i></span>'
           +    '<span class="amt">' + money.format(total * c[2]) + '</span>'
           +    '<span class="pct">' + (c[2] * 100).toFixed(2) + '%</span>'
           +  '</div>';
    }
    barsEl.innerHTML = html;
    if (shownEl) shownEl.textContent = expanded ? 'All 40 categories' : 'Top 12 of 40 shown';
    if (toggle) toggle.textContent = expanded ? 'Show top 12 only' : 'Show all 40 categories';
  }

  sqft.addEventListener('input', render);
  rate.addEventListener('input', render);
  if (toggle) toggle.addEventListener('click', function () { expanded = !expanded; render(); });
  render();
})();

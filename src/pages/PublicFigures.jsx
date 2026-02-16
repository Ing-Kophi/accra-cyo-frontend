import { useEffect, useState } from "react";
import api from "../services/api";
import { Bar, Pie } from "react-chartjs-2";
import "../utils/chartSetup";

export default function PublicFigures() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [rows, setRows] = useState([]);
  const COLORS = {
    green: "#198754",   // CYO primary
    blue: "#0d6efd",    // strong contrast
    orange: "#fd7e14",  // highlight
    purple: "#6f42c1",  // distinct
    red: "#dc3545",     // alerts / emphasis
    grey: "#adb5bd"     // neutral
    };

    const fetchYears = async () => {
    const res = await api.get("/public/years");
    setYears(res.data);
    };

    const fetchRegistrations = async (year) => {
    const res = await api.get(`/public/registrations/${year}`);
    setRows(res.data);
    };

  useEffect(() => {
    fetchYears();
  }, []);

  const yearRows = rows.filter(
    r => String(r.year_label) === String(selectedYear)
  );

  const sum = (list, fields) =>
    list.reduce(
      (acc, item) =>
        acc + fields.reduce((s, f) => s + item[f], 0),
      0
    );

  const totalMales = sum(yearRows, [
    "infant_male", "apostle_male", "soldier_male", "officer_male"
  ]);

  const totalFemales = sum(yearRows, [
    "infant_female", "apostle_female", "soldier_female", "officer_female"
  ]);

  const grandTotal = totalMales + totalFemales;

  // Group by deanery
  const deaneries = {};
  yearRows.forEach(r => {
    if (!deaneries[r.deanery_name]) deaneries[r.deanery_name] = [];
    deaneries[r.deanery_name].push(r);
  });

  const deaneryLabels = Object.keys(deaneries);

    const deaneryTotals = deaneryLabels.map(d =>
    deaneries[d].reduce((sum, r) =>
        sum +
        r.infant_male + r.apostle_male + r.soldier_male + r.officer_male +
        r.infant_female + r.apostle_female + r.soldier_female + r.officer_female
    , 0)
    );

    const deaneryMaleTotals = deaneryLabels.map(d =>
    deaneries[d].reduce((sum, r) =>
        sum +
        r.infant_male + r.apostle_male + r.soldier_male + r.officer_male
    , 0)
    );

    const deaneryFemaleTotals = deaneryLabels.map(d =>
    deaneries[d].reduce((sum, r) =>
        sum +
        r.infant_female + r.apostle_female + r.soldier_female + r.officer_female
    , 0)
    );


    const rankTotals = {
  "Infant Jesus": sum(yearRows, ["infant_male", "infant_female"]),
  "Young Apostles": sum(yearRows, ["apostle_male", "apostle_female"]),
  "Christian Soldiers": sum(yearRows, ["soldier_male", "soldier_female"]),
  "Officers": sum(yearRows, ["officer_male", "officer_female"])
    };

    const totalPerDeaneryChart = {
  labels: deaneryLabels,
  datasets: [
    {
      label: "Total Registered",
      data: deaneryTotals,
      backgroundColor: COLORS.blue
    }
     ]
    };

    const genderStackedChart = {
    labels: deaneryLabels,
    datasets: [
        {
        label: "Male",
        data: deaneryMaleTotals,
        backgroundColor: COLORS.green
        },
        {
        label: "Female",
        data: deaneryFemaleTotals,
        backgroundColor: COLORS.orange
        }
    ]
    };

    const stackedOptions = {
    responsive: true,
    scales: {
        x: { stacked: true },
        y: { stacked: true }
    }
    };

    const rankPieChart = {
        labels: Object.keys(rankTotals),
        datasets: [
            {
            data: Object.values(rankTotals),
            backgroundColor: [
                COLORS.green,
                COLORS.blue,
                COLORS.orange,
                COLORS.purple
            ],
            borderColor: '#ffffff',
            borderwidth: 2,
            hoveroffset: 6
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
            position: "bottom",
            labels: {
                boxWidth: 18,
                padding: 15
            }
            }
        }
        };


  return (
    <div className="container my-5">
      <h2 className="text-center cyogreen mb-3">
        National Registration Figures
      </h2>

      <p className="text-center">
        <strong>CYO… Do something for God and Ghana now!</strong>
      </p>

      {/* YEAR SELECTOR */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedYear}
            onChange={(e) => {setSelectedYear(e.target.value);
                fetchRegistrations(e.target.value);
            }}
          >
            <option value="">Select Registration Year</option>
            {years.map(y => (
              <option key={y.id} value={y.year_label}>
                {y.year_label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRAND TOTAL */}
      {selectedYear && (
        <div className="alert alert-success text-center">
          <h5>Archdiocesan Total for Year – {selectedYear}</h5>
          <p className="mb-1">Males: {totalMales}</p>
          <p className="mb-1">Females: {totalFemales}</p>
          <h4>Total Registered: {grandTotal}</h4>
        </div>
      )}

        {selectedYear && (
        <>
            <h4 className="text-center cyogreen mt-5 mb-3">
            Registration Charts – {selectedYear}
            </h4>

            <div className="row">
            <div className="col-md-6 mb-4">
                <h6 className="text-center">Total per Deanery</h6>
                <Bar data={totalPerDeaneryChart} />
            </div>

            <div className="col-md-6 mb-4">
                <h6 className="text-center">Male vs Female per Deanery</h6>
                <Bar data={genderStackedChart} options={stackedOptions} />
            </div>
            </div>

            <div className="row justify-content-center">
            <div className="col-md-6">
                <h6 className="text-center">Distribution by Rank</h6>
                <Pie data={rankPieChart} options={chartOptions} />
            </div>
            </div>
        </>
        )}


      {/* DEANERY & PARISH BREAKDOWN */}
      {Object.keys(deaneries).map(deanery => {
        const dRows = deaneries[deanery];
        const dMales = sum(dRows, [
          "infant_male", "apostle_male", "soldier_male", "officer_male"
        ]);
        const dFemales = sum(dRows, [
          "infant_female", "apostle_female", "soldier_female", "officer_female"
        ]);

        return (
          <div key={deanery} className="mb-4">
            <h5 className="text-success">{deanery} Deanery</h5>

            <p>
              <strong>Total:</strong> {dMales + dFemales}
              {" "} (M: {dMales}, F: {dFemales})
            </p>

            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead className="table-light">
                  <tr>
                    <th>Parish</th>
                    <th>Males</th>
                    <th>Females</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dRows.map(p => {
                    const pm =
                      p.infant_male + p.apostle_male +
                      p.soldier_male + p.officer_male;

                    const pf =
                      p.infant_female + p.apostle_female +
                      p.soldier_female + p.officer_female;

                    return (
                      <tr key={p.id}>
                        <td>{p.parish_name}</td>
                        <td>{pm}</td>
                        <td>{pf}</td>
                        <td className="fw-bold">{pm + pf}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <p className="text-center mt-5 small text-muted">
        For God and Ghana! — Thanks be to God.
      </p>
    </div>
  );
}

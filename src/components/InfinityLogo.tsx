import KT from "../assets/images/team/kt.svg";
import LG from "../assets/images/team/lg.svg";
import NC from "../assets/images/team/nc.svg";
import SSG from "../assets/images/team/ssg.svg";
import KIWOOM from "../assets/images/team/kiwoom.svg";
import KIA from "../assets/images/team/kia.svg";
import LOTTE from "../assets/images/team/lotte.svg";
import DOOSAN from "../assets/images/team/doosan.svg";
import SAMSUNG from "../assets/images/team/samsung.svg";
import HANHWA from "../assets/images/team/hanwha.svg";

const logos = [
  {
    name: "KT",
    url: "https://www.ktwiz.co.kr/",
    logo: KT,
  },
  {
    name: "LG",
    url: "https://www.lgtwins.com/service/html.ncd?view=/pc_twins/twins_main/twins_main",
    logo: LG,
  },
  {
    name: "NC",
    url: "https://www.ncdinos.com/",
    logo: NC,
  },
  {
    name: "SSG",
    url: "https://www.ssglanders.com/main",
    logo: SSG,
  },
  {
    name: "KIWOOM",
    url: "https://heroesbaseball.co.kr/index.do",
    logo: KIWOOM,
  },
  {
    name: "KIA",
    url: "https://www.tigers.co.kr/",
    logo: KIA,
  },
  {
    name: "LOTTE",
    url: "https://www.giantsclub.com/html/",
    logo: LOTTE,
  },
  {
    name: "DOOSAN",
    url: "https://www.doosanbears.com/",
    logo: DOOSAN,
  },
  {
    name: "SAMSUNG",
    url: "https://www.samsunglions.com/index.asp",
    logo: SAMSUNG,
  },
  {
    name: "HANHWA",
    url: "https://www.hanwhaeagles.co.kr/index.do",
    logo: HANHWA,
  },
];

export default function InfinityLogo() {
  return (
    <div className="marquee-wrapper my-10">
      <div className="marquee-track">
        {logos.map((logo) => (
          <a
            href={logo.url}
            key={logo.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img key={logo.name} src={logo.logo} alt={logo.name} />
          </a>
        ))}
        {logos.map((logo) => (
          <a
            href={logo.url}
            key={logo.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img key={logo.name} src={logo.logo} alt={logo.name} />
          </a>
        ))}
      </div>
    </div>
  );
}

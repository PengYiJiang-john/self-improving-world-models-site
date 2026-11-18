window.RESEARCH_CONTENT = {
  "zh": {
    "title": "从自我感知，到自主进化的世界模型",
    "subtitle": "用预测比较尚未执行的动作，从身体到工具和他者，在真实反馈中持续改进模型与决策。",
    "sections": [
      {
        "id": "overview",
        "nav": "研究主线",
        "kicker": "研究计划 · 2026 年 11 月",
        "title": "从自我感知到自主进化的世界模型",
        "lead": "手臂要伸向同一个目标，小幅伸展和大幅伸展会把手带到不同位置。世界模型先预测这些结果，任务目标决定怎样取舍，然后执行选定动作。预测让尚未执行的动作变得可比较。这是基于模型控制的基本思路。",
        "body": [
          {
            "heading": "模型提供结果，目标决定取舍",
            "text": "在上面的在线规划示意中，模型分别预测两种伸展后的手末端位置，目标位置用于评价哪一个更合适。改变目标，可以改变动作选择；手臂动作怎样产生运动的预测，仍然可以被利用。"
          },
          {
            "heading": "学会影响选择的变化",
            "text": "为了把手伸到目标，模型需要掌握动作与身体运动之间的联系。工具操作则增加工具运动和接触后果。模型围绕任务所需的判断逐步学习，无须先掌握外部世界的全部物理规律。"
          },
          {
            "heading": "执行之后，获得真实反馈",
            "text": "只有选定的动作会实际执行，身体反馈随后到来。把真实结果与这次预测比较，可以发现偏差并为以后选择积累经验；未执行动作的后果仍是模型预测。"
          }
        ],
        "takeaway": "世界模型的价值在于支持动作取舍：预测后果，用目标评价，再让真实反馈帮助后续决策。",
        "bridge": "预测可以在执行前用于在线规划，也可以在训练中帮助策略学会选择动作。下一节说明这两种进入控制的方式。",
        "details": [
          {
            "title": "主线与支线的关系",
            "text": "本体感知与柏拉图表征假说在感知支线展开；工具操作与预测决策解释自身怎样作用于外部；他者交互引入具有自主行为的对象。RSI 贯穿三者，多模型选择、模型自身更新、表达能力扩展与主动学习在其支线展开。"
          },
          {
            "title": "贯穿全程的问题",
            "text": "系统在当前任务中需要知道什么？已有身体经验能利用哪些新信息？当行动结果超出预期，应继续学习已有关系，还是扩展感知和模型？"
          }
        ]
      },
      {
        "id": "prediction",
        "nav": "预测与决策",
        "kicker": "01 · Model-based control",
        "title": "让预测进入动作选择",
        "lead": "模型把当前状态和候选动作连接到可能的后果。这些预测可以直接用于在线比较，也可以用于训练动作策略。两种方式都把任务目标与动作后果联系起来，让预测参与控制。",
        "body": [
          {
            "heading": "在线规划：执行前比较候选动作",
            "text": "模型预测控制（MPC）用模型比较候选动作序列，依据目标和任务约束选择，执行其中的第一步，再根据新反馈重新规划。首页的小幅与大幅伸展示意，展示了这种先比较、再执行的基本思路。"
          },
          {
            "heading": "在模型中训练策略",
            "text": "预测也可以进入训练过程。SuperMimic 学习可微动力学模型，用预测的身体运动训练动作策略；也可以利用模型生成的轨迹学习策略。学到的策略随后给出动作，将模型提供的经验转化为控制能力。"
          },
          {
            "heading": "目标改变，评价随之改变",
            "text": "同一组动作后果，可以按不同任务目标重新评价。例如，手臂改为伸向另一个位置，比较时使用的新目标会改变动作的优劣。动作怎样改变状态的预测，与任务希望得到什么结果，分别承担不同职责。"
          },
          {
            "heading": "预测围绕动作选择保留信息",
            "text": "模型需要抓住会影响当前选择的变化。评价同时记录预测误差、动作选择和任务表现：更好的预测是否改变了该执行的动作，以及这种改变是否帮助完成目标。"
          }
        ],
        "takeaway": "模型预测动作后果，目标赋予结果价值；在线规划或策略训练把两者转化为行动。",
        "bridge": "这一思路先落到身体上：关节动作由机器人发出，位置、速度和姿态随时提供反馈。身体因此是学习动作后果的现成起点。",
        "details": [
          {
            "title": "表征与动力学的接口",
            "text": "编码器根据已经获得的观测和动作历史形成当前状态表征；动力学模型接收这一表征与候选动作，预测后续变化。保留历史可以帮助系统利用当前单次观测中缺少的信息。 用 \\(h_t=(o_0,a_0,o_1,\\ldots,a_{t-1},o_t)\\) 表示已获得的历史，其中 \\(o_t\\) 是当前观测。\\(z_t=E_{\\phi_t}(h_t)\\) 是编码器形成的状态，\\(\\phi_t\\) 是它的参数。\\(F_{\\theta_t}(z_t,a)\\) 预测候选动作 \\(a\\) 的后果，\\(\\theta_t\\) 为预测模型的参数；实际执行的动作写作 \\(a_t\\)。"
          },
          {
            "title": "预测怎样接入控制",
            "text": "比较三条路径：通过可微模型训练动作策略，使用模型生成的轨迹训练策略，以及用模型预测控制（MPC）在线比较动作序列。Actor 负责输出动作，Critic 评价长期任务收益。"
          },
          {
            "title": "模型与决策的共同评价",
            "text": "在共同任务和数据条件下，记录单步与多步预测、动作排序、控制表现和计算开销。评价重点包括模型是否抓住会改变动作选择的因素，以及这些预测在新的交互条件下是否仍然有用。"
          }
        ]
      },
      {
        "id": "perception",
        "nav": "身体与行动",
        "kicker": "02 · Self",
        "title": "身体提供现成的动作与反馈",
        "lead": "机器人能够发出关节动作，并持续获得位置、速度与姿态反馈。身体模型把这些状态和动作联系起来，预测自己的运动。本体经验可以直接支持一部分控制任务，也为比较视觉、触觉等额外信息提供基准。",
        "body": [
          {
            "heading": "从可直接获得的身体状态预测运动",
            "text": "关节位置、速度与姿态贴近控制需要调节的量。身体模型据此预测动作后的运动，策略再利用这些经验实现站立、行走或手臂动作。本体感知支线具体讨论这种直接联系，以及它能够支持的任务。"
          },
          {
            "heading": "把额外感官的贡献放进同一任务比较",
            "text": "同一任务保留仅本体感知的基线，再加入触觉、视觉或二者组合。记录动作预测与控制表现的变化，确定哪些新增信息实际帮助了选择。新感官因而可以围绕已有身体能力接入。"
          },
          {
            "heading": "柏拉图假说：不同感官记录同一次交互",
            "text": "柏拉图表征假说提出，不同模型和模态的内部表示可能趋同。围绕同一次接触，研究视觉、触觉与本体经验是否存在可利用的共同结构，并检验这种联系怎样帮助已有身体系统利用新信息。"
          },
          {
            "heading": "通过轻量接入检验这种联系",
            "text": "轻量 Adapter 实验同时检验两件事：新增感官是否帮助任务，以及它的表示能否与已有身体表示连接。跨模态预测、联合学习、JEPA 与多视角研究提供进一步的比较，具体方法在柏拉图表征支线展开。"
          }
        ],
        "takeaway": "身体把自身动作与可获得的反馈连接起来；本体是否足够、额外感官是否有用，可以在同一控制任务中比较。",
        "bridge": "知道手会到哪里，还不足以判断握住的杆能否触及目标。工具把身体运动传到外部，预测的后果需要延伸到杆端和接触对象。",
        "details": [
          {
            "title": "两个感知支线",
            "text": "身体经验支线研究哪些局部、自身的信息已经足以支持行动；柏拉图表征支线研究视觉、触觉与本体表示之间的联系，以及新信息怎样被已有系统利用。"
          },
          {
            "title": "近期的共同实验",
            "text": "在相同任务与预算下，保留仅本体感知的基线，比较轻量触觉接入、视觉接入和联合学习。记录任务收益、所需数据和已有能力保留，让新增信息的作用可以被比较。"
          }
        ]
      },
      {
        "id": "manipulation",
        "nav": "从身体到工具",
        "kicker": "03 · World · Body → Tools",
        "title": "工具把身体动作传到外部",
        "lead": "握住工具后，手臂运动会带动杆端，接触又可能改变物体与身体的状态。同一手臂动作在不同杆长或握持位置下，会产生不同的外部后果。持杆触碰与推物把这部分后果纳入预测，并保留仅本体感知的比较起点。",
        "body": [
          {
            "heading": "动作仍然由身体发出",
            "text": "工具通过握持与身体相连。手臂动作改变杆端的运动，接触又可能改变身体的响应。研究能否从这种动作与反馈的联系中，学习完成工具任务所需的预测。"
          },
          {
            "heading": "从自身动作和反馈学习工具后果",
            "text": "从给定目标的触碰任务开始，再加入推物，先研究使用关节状态、动作历史和身体响应能够学到什么。杆端运动与接触结果作为操作后果，在任务评价中检验。"
          },
          {
            "heading": "工具变化改变同一动作的后果",
            "text": "改变杆长、握持位置或接触条件，观察原有经验还能支持哪些动作。研究系统能否通过继续交互学会这些变化，以及哪些任务持续需要它尚未掌握的信息。"
          },
          {
            "heading": "出现缺口，再比较怎样补足",
            "text": "对难以完成的任务，比较继续训练、利用更长的历史、改变预测模型，以及加入触觉或视觉。研究由具体操作结果决定：需要的是更好的学习，还是新的信息和表示。"
          }
        ],
        "takeaway": "World 扩展的是需要预测的后果：身体动作经工具作用于外部，本体经验与额外感知分别能提供什么，由操作任务检验。",
        "bridge": "动作也会影响有自身目标的其他智能体。对方会选择怎样回应，这个回应又改变行动结果；预测因此还需要包含他者的选择。",
        "details": [
          {
            "title": "操作实验的递进",
            "text": "从固定工具的目标触碰开始，再加入推物与工具变化。在线控制先使用明确列出的本体输入；任务评价记录杆端运动、接触结果与成功情况。随后逐项加入视觉或触觉，以比较额外感知的贡献。"
          },
          {
            "title": "围绕任务学习关系",
            "text": "比较仅本体感知与加入额外观测的模型，研究动作历史中能够学到哪些工具关系。将信息不足、训练不足和模型表达能力作为待比较的解释，通过后续任务和不同修改方案积累证据。"
          }
        ]
      },
      {
        "id": "coordination",
        "nav": "理解其他智能体",
        "kicker": "04 · Others",
        "title": "把会响应的对方纳入世界模型",
        "lead": "当动作影响的是另一个智能体，对方的回应会参与决定结果。继续前进、减速或等待，会改变对方所面对的局面；对方又依据自己的目标作出选择。Others 把这种自主回应纳入动作后果的预测。",
        "body": [
          {
            "heading": "预测对方如何响应",
            "text": "以共享通道为例，继续前进、减速或等待，可能引出对方不同的行动。模型利用交互历史，预测每个候选动作之后对方的响应，以及双方接下来可能到达的状态。"
          },
          {
            "heading": "通过自身行动检验预测",
            "text": "系统根据预测选择动作，再观察对方的实际响应。这次交互既推进当前任务，也提供关于对方行为的新经验。将响应与预测比较，研究当前交互模型能解释什么，还需要哪些证据。"
          },
          {
            "heading": "修正或扩展交互模型",
            "text": "已知行为再次出现时，可以选择已有模型；对方行为持续变化时，研究如何调整模型、增加新的预测模块，或补充更长的交互历史。这里需要解释的变化，还包括对方根据交互作出的自主选择。"
          },
          {
            "heading": "让更好的预测帮助下一次行动",
            "text": "在让行、共同搬运等任务中，检验更新后的模型能否帮助系统选择更合适的动作。既记录对方响应的预测是否改善，也观察等待、冲突和任务完成情况。"
          }
        ],
        "takeaway": "Others 扩展的是世界模型需要理解的对象：预测、行动、反馈和模型更新继续运行，对方也会根据交互作出响应。",
        "bridge": "身体、工具和他者的预测都遇到同一个学习问题：系统只实际观察执行过的动作后果，而模型又影响它愿意执行什么。RSI 关注这条相互依赖怎样带来持续能力改进。",
        "details": [
          {
            "title": "怎样检验他者模型",
            "text": "先固定地面和负载，只改变对方的行进或让行策略，比较固定预测器、在线修正和新增交互模型。再叠加物理条件变化，观察系统能否区分不同变化，并在熟悉行为再次出现时复用模型。"
          },
          {
            "title": "自身动作也改变证据",
            "text": "如果机器人始终等待，就很少得到对方如何响应自身前进的经验。主动学习需要比较不同受约束动作能提供什么信息，并在后续交互中检验更新后的行为预测。"
          }
        ],
        "extension": {
          "title": "延伸阅读：共享约束下的协调",
          "lead": "给定交互模型以后，还可以研究多个机器人怎样在共享空间和资源限制下协调行动。有限模式、广义纳什均衡（GNE）和变分均衡（VGNE）处理这一决策层的问题。",
          "details": [
            {
              "title": "有限模式的数学对象",
              "text": "在给定当前状态的一次决策中，\\(u=(u_1,\\ldots,u_N)\\) 表示 \\(N\\) 个智能体的联合决策，\\(\\mathcal X\\) 是满足共享约束的可行集。协调器从 \\(B\\) 个模式中广播 \\(m\\)，为智能体 \\(i\\) 指定局部可行集 \\(\\mathcal X_i(m)\\)。\n\\[\\begin{aligned}\\mathcal Q_m&=\\prod_{i=1}^{N}\\mathcal X_i(m)\\subseteq\\mathcal X,\\\\ \\mathcal X_{\\mathrm{modes}}&=\\bigcup_{m=1}^{B}\\mathcal Q_m.\\end{aligned}\\]\n\\(\\mathcal Q_m\\) 是模式 \\(m\\) 下所有局部选择的组合；包含关系确保这些组合满足当前共享约束。\\(\\mathcal X_{\\mathrm{modes}}\\) 是全部模式覆盖的区域，研究模式数 \\(B\\) 与覆盖误差的关系。即时控制时 \\(u_i\\) 对应智能体 \\(i\\) 的动作；轨迹规划时它对应一段动作序列。"
            },
            {
              "title": "均衡、安全与模型学习",
              "text": "在给定模型与共享约束下，研究均衡存在性、唯一性和分布式算法收敛；进一步分析强单调性等条件下的均衡与社会最优偏差。鲁棒控制、控制障碍函数（CBF）或高阶 CBF 用于表达探索中的安全约束，并将模型不确定性与控制可行性一并纳入设计。"
            },
            {
              "title": "均衡偏差的分析模板",
              "text": "用联合决策 \\(u\\) 表示同一时刻的动作或同一时域的计划。令 \\(J_i(u)\\) 是智能体 \\(i\\) 的代价，\\(J_{\\mathrm{soc}}\\) 是总代价，\\(\\Psi\\) 收集各智能体对自身决策的代价梯度：\n\\[\\begin{aligned}\\Psi(u)&=\\operatorname{col}_{i=1}^{N}\\nabla_{u_i}J_i(u),\\\\ J_{\\mathrm{soc}}(u)&=\\sum_{i=1}^{N}J_i(u).\\end{aligned}\\]\n固定同一个非空闭凸可行域 \\(\\mathcal X\\)。各 \\(J_i\\) 可微且对自身决策凸，\\(J_{\\mathrm{soc}}\\) 可微凸。设变分均衡 \\(u^{\\mathrm{VE}}\\) 与社会最优解 \\(u^\\star\\) 存在；\\(u^{\\mathrm{VE}}\\) 满足 \\(\\langle \\Psi(u^{\\mathrm{VE}}),u-u^{\\mathrm{VE}}\\rangle\\ge0\\) 对所有 \\(u\\in\\mathcal X\\) 成立，而 \\(u^\\star\\) 最小化该域上的总代价。若 \\(\\Psi\\) 满足下列强单调条件，则得到偏差界：\n\\[\\begin{gathered}\\langle \\Psi(u)-\\Psi(v),u-v\\rangle\\ge\\mu\\|u-v\\|_2^2,\\\\ u,v\\in\\mathcal X,\\qquad\\mu>0,\\\\ \\delta=\\|\\Psi(u^\\star)-\\nabla J_{\\mathrm{soc}}(u^\\star)\\|_2,\\\\ \\|u^{\\mathrm{VE}}-u^\\star\\|_2\\le\\delta/\\mu.\\end{gathered}\\]\n\\(\\delta\\) 衡量社会最优处个体与社会的边际代价差，\\(\\mu\\) 是强单调常数，\\(\\|\\cdot\\|_2\\) 是欧氏范数。这个分析模板把两者与均衡位置偏差连接起来；具体任务中研究这些条件如何成立。模式覆盖误差在前一项中单独评价。"
            }
          ]
        }
      },
      {
        "id": "rsi",
        "nav": "经验与自我改进",
        "kicker": "贯穿机制 · Self / World / Others",
        "title": "让经验改善以后的决策与学习",
        "lead": "实际反馈只来自执行过的动作。当前 belief，也就是对各候选预测模型的相对信任，影响系统尝试什么；这些尝试带来新证据，新证据再改变模型与以后的选择。这种依赖存在于 Self、World 和 Others 三层。递归自我改进（RSI）研究这些变化能否持续扩大系统的可用能力。",
        "body": [
          {
            "heading": "动作选择也决定了学习经验",
            "text": "伸臂时只执行了小幅动作，就得到这次动作的真实结果；大幅动作仍只有预测。工具操作和他者交互同样如此。模型据已获得的经验更新，也因此可能长期缺少某些动作下的证据。"
          },
          {
            "heading": "选择候选模型，继续更新每个模型",
            "text": "同一个动作在不同条件下可能产生不同后果，系统可以保留几种预测解释。Berk–Nash 为信念、行动和经验的相互影响提供理论入口。本研究考虑优先采用 belief 最高的模型；新反馈既更新信念，也用于各模型自身的快慢学习，兼顾近期适应与长期经验保留。"
          },
          {
            "heading": "分辨还没学好与表达不了",
            "text": "当失配持续存在，研究已有模型是还没学好，还是缺少表达相关现象的能力。比较继续训练、新预测模块以及观测或表征扩展，用后续任务表现判断该改什么，以及改动是否扩大了可用能力。"
          },
          {
            "heading": "用后续能力判断改进，而不只记录更新",
            "text": "模型改过参数、信念变得更集中，都只是学习过程中的变化。RSI 的目标是让这些变化改善以后的决策与学习。主动试探提供能区分解释的经验，再用新动作、新条件和旧任务检验预测、控制与能力保留，判断系统是否获得了持续收益。"
          }
        ],
        "takeaway": "持续更新为自我改进提供材料；RSI 以以后能否更好地行动和学习，评价这些更新是否带来了能力增长。",
        "bridge": "实验需要把这些作用拆开观察：预测怎样改变动作选择，本体和新感官分别贡献什么，模型更新与扩展又怎样影响后续能力。",
        "details": [
          {
            "title": "RSI 支线展开的三个问题",
            "text": "RSI 支线集中展开三个问题：belief 怎样选择模型、模型怎样快慢更新；已有模型不足时怎样扩展；怎样通过行动获得有辨识价值的经验。预测到决策的基本过程在主线中说明，多专家、IMM、MoE 与主动学习在这里作为具体方法比较。"
          },
          {
            "title": "通过多轮交互评价改进",
            "text": "保留每轮模型、训练经验和后续任务表现，比较继续训练与改变模型能力的效果。环境和工具再次出现时检验旧知识能否复用，并记录新模型带来的计算和学习开销。"
          }
        ]
      },
      {
        "id": "experiments",
        "nav": "实验路线",
        "kicker": "05 · Research program",
        "title": "沿着行动能力的扩展安排实验",
        "lead": "六组实验围绕同一条因果链组织：信息进入模型，预测参与动作选择，实际结果再用于学习。身体、工具和他者任务提供不同预测对象；感知、模型选择和能力扩展的比较，说明这条链中的哪些变化带来了任务收益。",
        "body": [
          {
            "heading": "把本体感知基线保留到工具操作",
            "text": "先复现身体控制，再研究仅凭本体动作与反馈能否学会持杆触碰和推物。视觉、触觉及它们的轻量接入作为比较方案，检验哪些任务真正受益于额外感知。"
          },
          {
            "heading": "在各类任务中检验学习机制",
            "text": "通过改变工具、接触条件和对方行为，比较模型选择、各模型自身的快慢更新与表达能力扩展。主动试探帮助区分解释，后续任务检验系统获得了什么新能力；这些比较也可以回到身体运动任务中进行。"
          }
        ],
        "takeaway": "把预测误差、动作选择与后续任务表现一起记录，才能说明模型和学习的变化怎样转化为行动能力。",
        "bridge": "这些实验共同检验预测是否帮助机器人选出更合适的动作，以及模型更新后，这种帮助能否延续到新任务。",
        "details": [
          {
            "title": "统一记录",
            "text": "保留任务定义、环境参数、模型版本、观测与动作接口，以及训练和评价数据划分。跨阶段同时记录预测、控制、学习开销和已有能力的保留情况。"
          },
          {
            "title": "研究问题与实验对应",
            "text": "身体、工具与他者实验对应理解对象；感知接入研究可用信息及其表征；模型选择、更新与能力扩展研究持续学习。这些维度可以在同一任务中交叉比较，编号用于组织实验。"
          }
        ],
        "stages": [
          {
            "name": "01 · 身体与感知基座",
            "question": "对自身的局部认识，能够支持哪些行动？",
            "design": "复现身体控制基座，在站立和行走任务中比较本体感知、视觉及二者结合，记录身体状态、动作与实际反馈。",
            "readout": "身体响应预测、动作选择、任务表现和扰动恢复，并记录感知与学习开销。",
            "next": "保留可复用身体能力，明确值得接入新感官的任务。"
          },
          {
            "name": "02 · 跨模态接入本体",
            "question": "额外的视觉与触觉何时有用，又怎样接入本体？",
            "design": "保留仅本体感知的任务基线，再比较视觉、触觉、轻量 Adapter、跨模态预测与联合学习；用多视角条件检验额外观测的作用。",
            "readout": "跨模态联系、接入所需数据、动作预测与控制表现。",
            "next": "保留有任务收益的接口，并继续以仅本体感知作为工具操作的比较起点。"
          },
          {
            "name": "03 · 从身体到工具操作",
            "question": "身体动作怎样作用于工具与物体，本体反馈能支持多少预测和控制？",
            "design": "从持杆触碰与推物开始，先测试本体感知与动作历史；改变杆长、握持位置和接触条件，再比较额外触觉或视觉的作用。",
            "readout": "杆端与接触结果预测、据此选出的动作、操作表现，以及既有身体经验的复用。",
            "next": "积累工具操作经验，识别需要模型适应的新变化。"
          },
          {
            "name": "04 · RSI：模型选择与更新",
            "question": "怎样选择可用模型，让各模型自身按不同节奏学习？",
            "design": "在身体、工具或他者任务中设置条件切换与重现，比较最高 belief 选择、IMM 与 MoE，并分别改变世界模型自身的更新节奏。",
            "readout": "belief 与后续表现的联系、切换延迟、模型更新速度和旧条件恢复。",
            "next": "识别通过现有模型的选择与学习仍难以处理的情况。"
          },
          {
            "name": "05 · RSI：表达与回音室",
            "question": "系统学会了新的能力，还是只增强了对已有模型的信任？",
            "design": "引入已有模型难以描述的变化，比较继续训练、新预测模块和感知或表征扩展，同时比较被动经验与主动试探。",
            "readout": "未参与训练的操作表现、未尝试动作的预测、旧能力保留、信念变化与学习开销。",
            "next": "建立从经验、模型修改到新行动检验的多轮改进过程。"
          },
          {
            "name": "06 · 他者响应与交互",
            "question": "当对方会选择如何回应时，怎样继续学习行动的后果？",
            "design": "在共享通道或共同操作中改变对方策略，比较固定预测、模型更新和新增交互模型，先固定物理条件，再引入其变化。",
            "readout": "对方响应预测、行为变化后的适应、任务表现和冲突次数。",
            "next": "将感知、行动与 RSI 扩展到具有独立决策能力的对象。"
          }
        ]
      },
      {
        "id": "framework",
        "nav": "统一框架",
        "kicker": "06 · The complete loop",
        "title": "让预测、选择与学习接成一条路线",
        "lead": "模型让尚未执行的动作能够按后果比较，任务目标决定取舍。预测对象从自身运动扩展到工具作用和他者回应，真实反馈则持续检验模型。整条路线关注这种预测能力怎样帮助行动，又怎样在经验中继续发展。",
        "body": [
          {
            "heading": "同一决策思路，逐步扩展预测对象",
            "text": "Self 预测自己的身体，World 预测身体经工具影响外部的结果，Others 预测有自身目标的对方如何回应。已有本体经验可以继续使用，视觉与触觉作为额外信息比较，柏拉图表征支线解释不同经验怎样连接。"
          },
          {
            "heading": "让反馈推动以后更有效的行动",
            "text": "执行的动作产生真实证据，模型和 belief 根据这些经验改变；各模型自身继续快慢更新，持续失配时再比较是否需要扩大信息或表达能力。RSI 研究这些改变能否帮助以后选择、适应和学习，而这种能力增长需要后续任务来验证。"
          }
        ],
        "takeaway": "预测的价值落在行动选择上，自我改进的价值落在以后的行动与学习上。",
        "bridge": "用后续任务中的动作选择、适应速度和旧能力保留，判断模型是否真正帮助行动和学习。",
        "details": [
          {
            "title": "跨版本比较",
            "text": "表征扩展可以改变编码器的输入、结构和参数。版本内的残差使用同一 \\(E_{\\phi_t}\\)；版本之间的改进用共同任务、物理目标或固定目标编码评价。这样，模型生成一节的结构变化与本节的更新步骤使用同一个评价尺度。"
          },
          {
            "title": "主线与 RSI 形式化的关系",
            "text": "Self、World、Others 给出任务与理解对象。预测、行动与反馈是它们共同的过程；下面的模型、belief 与更新表达展开 RSI 中的选择、学习和能力扩展。"
          }
        ],
        "equations": [
          {
            "label": "感知",
            "formula": "z_t=E_{\\phi_t}(h_t)",
            "description": "把执行当前动作前已获得的历史编码为潜在状态。\\(\\phi_t\\) 表示当前编码器参数。"
          },
          {
            "label": "预测",
            "formula": "\\widehat z_{t+1\\mid t}^{(k)}(a)=F_{\\theta_{k,t}}(z_t,a)",
            "description": "模型库 \\(\\mathcal M_t=\\{F_{\\theta_{k,t}}\\}_{k=1}^{K_t}\\) 中的每个候选，分别预测待比较动作 \\(a\\) 的后果。"
          },
          {
            "label": "选择并行动",
            "formula": "\\begin{aligned}k_t^\\star&\\in\\arg\\max_k b_t^{(k)},\\\\a_t&=\\pi(z_t,F_{\\theta_{k_t^\\star,t}},g_t).\\end{aligned}",
            "description": "\\(b_t^{(k)}\\) 是对模型 \\(k\\) 的 belief，\\(k_t^\\star\\) 是选中的模型编号。策略 \\(\\pi\\) 利用它的预测与任务目标 \\(g_t\\) 选择动作。"
          },
          {
            "label": "反馈",
            "formula": "\\begin{aligned}e_{t+1}^{(k)}={}&E_{\\phi_t}(h_{t+1})\\\\ &-\\widehat z_{t+1\\mid t}^{(k)}(a_t)\\end{aligned}",
            "description": "\\(e_{t+1}^{(k)}\\) 是第 \\(k\\) 个模型的预测残差。本轮预测和新反馈使用同一编码器；完成比较后再更新表征。"
          },
          {
            "label": "模型自身更新",
            "formula": "\\theta_{k,t+1}=U_{k,t}(\\theta_{k,t},h_{t+1})",
            "description": "\\(U_{k,t}\\) 表示模型 \\(k\\) 本轮的学习规则。快慢指这个模型自身吸收和保留经验的节奏。belief 的更新则另行决定下一轮更相信哪个模型。"
          },
          {
            "label": "演化",
            "formula": "\\mathcal S_{t+1}=\\mathcal U(\\mathcal S_t,h_{t+1})",
            "description": "\\(\\mathcal S_t=(E_{\\phi_t},\\mathcal M_t,\\mathbf b_t)\\) 包含当前表征、模型库与 belief。\\(\\mathcal U\\) 汇总本轮学习和信念更新，并在需要时增加模型、改变表征或合并重复模型。"
          }
        ],
        "questions": [
          "Self：已有身体模型与本体感知能够支持哪些行动？",
          "Perception：不同感官的表征能否相通，新信息怎样帮助任务？",
          "World：身体怎样通过工具作用于外部，预测怎样帮助选择动作？",
          "RSI · Updates：怎样选择候选模型，让模型自身持续学习？",
          "RSI · Expansion：何时需要扩大表达能力，怎样用新经验检验真实改进？",
          "Others：当对方会自主回应时，怎样预测并检验行动后果？"
        ],
        "symbols": [
          {
            "symbol": "o_t=(o_t^p,o_t^v,o_t^h)",
            "meaning": "本体、视觉、触觉观测；各实验阶段使用已接入的模态。"
          },
          {
            "symbol": "h_t",
            "meaning": "交互历史：\\(h_t=(o_0,a_0,o_1,\\ldots,a_{t-1},o_t)\\)。先观测，再选择当前动作。"
          },
          {
            "symbol": "\\phi_t,\\ \\theta_{k,t}",
            "meaning": "当前编码器参数、第 \\(k\\) 个动力学模型参数；\\(t\\) 标记正在使用的版本。"
          },
          {
            "symbol": "k,\\ K_t",
            "meaning": "候选模型编号、当前模型数量。"
          },
          {
            "symbol": "a,\\ a_t",
            "meaning": "待比较的候选动作、最终执行的动作。"
          },
          {
            "symbol": "\\widehat z_{t+1\\mid t}^{(k)},\\ e_{t+1}^{(k)}",
            "meaning": "下一步状态的预测、收到实际反馈后计算的预测残差。"
          },
          {
            "symbol": "\\mathbf b_t,\\ g_t",
            "meaning": "各候选模型的 belief 向量、当前任务目标。"
          }
        ]
      },
      {
        "id": "body",
        "nav": "身体与经验",
        "kicker": "感知支线 · 身体经验",
        "title": "本体感知直接连接动作与反馈",
        "lead": "关节位置、速度与姿态，让机器人持续获得自己运动的反馈。这些状态贴近站立、行走和手臂控制需要调节的量，身体模型可以据此学习动作后果。本体感知支线从这一直接联系出发，比较它独立支持的任务与额外感官带来的收益。",
        "body": [
          {
            "heading": "本体感知直接提供身体控制所需的信息",
            "text": "关节位置与速度、姿态和身体运动，直接对应站立与行走需要调节的量。视觉需要从图像中推断相关状态，本体感知则持续提供贴近身体控制的信息。因此，在这些任务中，身体经验可能成为更直接有效的学习起点。"
          },
          {
            "heading": "支持行动，可以从局部认识开始",
            "text": "盲人能够借助本体感知、平衡感与触觉行走。这启发本研究从身体及其直接经验出发：先知道自身怎样运动、如何响应动作，就能够学习维持姿态和迈步。对行动有用的认识可以先在这一局部范围内建立，再随经验扩展。"
          },
          {
            "heading": "以 SuperMimic 为身体预测的起点",
            "text": "SuperMimic 学习可微动力学模型，并用它支持运动策略训练。本研究以这套能力为起点，同时比较视觉、触觉怎样接入已有身体系统，以及它们对动作预测和控制的帮助。"
          },
          {
            "heading": "在任务需要时比较额外感知",
            "text": "迈步后发生滑动，本体感知已经记录身体的实际响应。研究先检验这些反馈能支持怎样的适应，再比较视觉或触觉提供的信息能否进一步改善任务。工具操作也沿用这种比较，寻找额外感知发挥作用的条件。"
          }
        ],
        "takeaway": "本体经验可以直接支持行动。研究检验它能走多远，以及额外感知在什么条件下有用。",
        "bridge": "身体模型是 Self 的起点。主页的工具操作研究这些能力怎样用于外部作用，柏拉图表征支线则检验额外感官怎样与已有身体经验连接。",
        "details": [
          {
            "title": "身体模型的研究接口",
            "text": "先确定身体状态、控制动作、近期运动历史和预测目标，建立可重复的预测与控制基线。比较仅使用本体感知与接入新模态后的任务表现，识别新增信息带来的作用。 身体状态记为 \\(s_t\\)，执行动作记为 \\(a_t\\)。\\(\\widehat s_{t+1\\mid t}\\) 是根据时刻 \\(t\\) 的信息预测的下一步身体状态；帽号表示预测值。"
          },
          {
            "title": "基座训练与扩展设计",
            "text": "SuperMimic 在训练迭代中更新动力学模型和策略，策略更新阶段固定动力学模型。本研究拟先保留已有身体基座，训练新感官的编码器与接入模块，再比较联合训练。"
          },
          {
            "title": "本体感知先行的机器人实例",
            "text": "Lee 等人在《Learning Quadrupedal Locomotion over Challenging Terrain》中，利用本体感知观测历史驱动四足机器人的运动策略，展示了无需外部视觉输入的复杂地形行走。它为从自身运动反馈建立行动能力提供了具体实例。"
          }
        ]
      },
      {
        "id": "representation",
        "nav": "柏拉图与多模态",
        "kicker": "感知支线 · 柏拉图表征假说",
        "title": "让不同感官描述同一次交互",
        "lead": "视觉、触觉与本体感知记录着同一次交互的不同侧面。柏拉图表征假说启发这一支线寻找这些经验中可相互利用的结构；轻量接入、跨模态预测和操作实验，同时检验表征联系与新增信息对任务的帮助。",
        "body": [
          {
            "heading": "用同一次接触比较不同感官",
            "text": "足部滑动时，图像记录脚与地面的相对运动，触觉记录接触变化，关节传感器记录身体响应。用同一次滑动配对这些观测，比较一种感官学到的表示能否帮助预测另一种感官记录的变化，并改善动作选择。"
          },
          {
            "heading": "通过轻量 Adapter 接入触觉",
            "text": "先保留已有身体控制系统，用一个小型接入模块（Adapter）把触觉信息送入已有状态表征。比较简单接入与联合学习，观察需要多大改动才能用好新感官。这个实验同时研究能力扩展，也检验不同感官的表征之间是否容易建立联系。"
          },
          {
            "heading": "用 JEPA 学习与后续变化有关的表征",
            "text": "JEPA 是通过预测内部表征来学习的方法。本研究探索它能否让视觉、触觉与身体经验保留对下一步交互有用的信息，并用实际任务检验这些信息是否帮助机器人选择动作。"
          },
          {
            "heading": "多个视角，观察同一空间",
            "text": "不同摄像头从不同位置观察同一次交互。研究将多视角观测与身体位置联系起来，考察改变视角后，系统能否仍然识别同一接触关系，并利用额外视角改善预测。"
          }
        ],
        "takeaway": "共同的物理交互为不同感官提供了联系；轻量接入、跨模态预测与任务表现，让这种联系可以被具体检验。",
        "bridge": "这些实验为感知接入本体提供证据。结果用于主页的身体与工具任务，检验相通的表征是否帮助动作预测与决策。",
        "details": [
          {
            "title": "触觉接入的比较",
            "text": "依次比较无触觉、直接拼接、线性映射或轻量 Adapter、联合学习表征，以及联合学习表征与动力学。记录预测、控制、所需数据和参数开销，考察不同接入方式能利用多少新增信息。"
          },
          {
            "title": "JEPA 与动作条件预测",
            "text": "在动作条件的时序设计中，目标编码器提供未来观测的表征，预测器根据当前表征和动作预测它。视频表征学习与动作条件训练分别开展；V-JEPA 2-AC 提供动作条件后训练与规划的参考。机器人研究还需纳入相应的动作与触觉接口。"
          },
          {
            "title": "多视角与任务反馈",
            "text": "多视角部分研究摄像头相对位姿、视角对齐、2D 特征与 3D 空间的联系，以及视觉坐标与身体坐标的转换。任务反馈用于比较表征中哪些信息有助于预测交互后果和选择动作。"
          }
        ]
      },
      {
        "id": "adaptation",
        "nav": "信念与模型更新",
        "kicker": "RSI 支线 · 选择与更新",
        "title": "根据经验选择模型，让模型持续学习",
        "lead": "同一个动作，在干地和湿地上会有不同后果。机器人可以保留几种预测模型，根据经验决定当前更相信哪一个。这个选择又会影响它接下来的行动，以及它能获得什么新经验。",
        "body": [
          {
            "heading": "Berk–Nash：信念、行动和经验相互影响",
            "text": "机器人依据自己相信的模型行动，再用行动得到的反馈判断模型。Berk–Nash 研究的正是这种关系：即使模型对世界的理解有偏差，智能体也可能在实际经历中找到支持它的证据，持续按这个模型行动。"
          },
          {
            "heading": "先使用当前 belief 最高的预测模型",
            "text": "belief 是系统根据已有经验，对每个候选模型的相对信任。本研究先考虑选择 belief 最高的模型，用它比较动作后果。获得真实反馈后，再看各模型此前的预测与结果有多吻合，更新 belief；更受支持的模型可以接替当前模型。"
          },
          {
            "heading": "快更新与慢更新，都发生在世界模型自身",
            "text": "每个世界模型还要继续学习。快更新让它及时吸收新经验，调整近期预测；慢更新从反复出现的经验中保留较稳定的规律。例如，短暂打滑后需要尽快调整预测，而长期在湿地上行走的经验，应当能在下次进入湿地时复用。需要比较的是模型自身如何更新、保留和遗忘。"
          },
          {
            "heading": "多专家是实现这些候选模型的一种方式",
            "text": "多个预测头可以共享感知编码器，也可以用不同 Adapter 保留各自学到的规律。IMM 提供利用观测更新模式概率的方法；MoE 学习怎样选择或组合专家。它们为实现和比较模型选择提供工具，快慢学习则继续发生在各个模型内部。"
          }
        ],
        "takeaway": "belief 决定当前用谁来预测；快慢更新决定每个世界模型怎样从经验中学习。",
        "bridge": "选择和更新处理已有模型。模型扩展研究这些模型无法覆盖的情况，主动学习则研究怎样获得足以区分解释的经验；三者共同构成 RSI。",
        "details": [
          {
            "title": "belief 与模型选择的符号",
            "text": "令 \\(b_t^{(k)}\\) 表示时刻 \\(t\\) 对第 \\(k\\) 个模型的 belief，\\(K_t\\) 为候选数量。主路径选择 \\(k_t^\\star\\) 对应的模型，再用它支持决策：\n\\[b_t^{(k)}\\ge0,\\quad \\sum_{k=1}^{K_t}b_t^{(k)}=1,\\qquad k_t^\\star\\in\\arg\\max_k b_t^{(k)}.\\]\n这里的最高 belief 选择是本研究采用的机制。Berk–Nash 本身要求行为在信念下最优，信念所支持的模型在这些行为产生的数据中拟合最好；原论文用 KL 差异衡量这种拟合。它不要求选取单个最高 belief 模型。"
          },
          {
            "title": "怎样比较更新节奏",
            "text": "固定模型数量和选择机制，比较单一更新节奏与快慢更新，再改变选择机制。分别记录每个模型的预测变化、短期扰动后的恢复、持续变化中的学习，以及回到旧环境时的表现。更新频率、数据窗口和学习强度是待比较的实现选择。"
          },
          {
            "title": "IMM 与 MoE 各自提供什么",
            "text": "IMM 的一轮估计包括混合初始状态估计、各模型预测与观测校正、模式概率更新和融合。MoE 的门控网络输出专家权重。门控权重表示专家分配；要把它解释为 belief，还需要给出相应的概率模型或校准依据。"
          }
        ]
      },
      {
        "id": "generation",
        "nav": "模型的表达边界",
        "kicker": "RSI 支线 · 表达能力扩展",
        "title": "最可信的模型，也可能描述不了新情况",
        "lead": "模型选择比较的是已有解释。机器人来到柔软地面后，即使所有模型都预测错了，仍然会有一个 belief 最高。此时要追问：是模型还没有学好，还是它所接收的信息、所能表达的规律本来就不够？",
        "body": [
          {
            "heading": "还能表达，只是没有学好",
            "text": "先保留输入和结构，用新经验更新模型。例如，同一种接触规律仍然适用，只是摩擦强弱变了。若继续学习就能改善后续预测，问题主要在于已有模型尚未适应。"
          },
          {
            "heading": "旧经验要保留，新规律也要学",
            "text": "如果新的接触规律与旧环境差别较大，可以增加一个预测头或 Adapter，学习新地面的响应，并保留原有模型供旧环境再次出现时使用。将这一方案与继续训练旧模型比较，判断是否需要新的模型以及怎样的结构。"
          },
          {
            "heading": "看不到的区别，靠反复训练也难以学会",
            "text": "假设两次接触在现有观测中没有区别，后续运动却因尚未观测的接触条件而不同。模型无从判断这次属于哪一种情况。触觉可能提供接触压力与滑动信息，更长历史也可能补上遗漏的变化。这时需要改变模型能获得的信息和内部表示。"
          },
          {
            "heading": "把新感官接回已有身体模型",
            "text": "加入触觉时，我们关心它能否与身体和视觉经验建立联系，让原本无法区分的接触变得可理解。这个问题同时连接表征与模型生成：系统能否借助新经验，扩大自己能够预测的现象范围？"
          }
        ],
        "takeaway": "选择最可信的解释之后，还要判断：现有模型有没有能力表达遇到的现象。",
        "bridge": "模型扩展需要能够检验其作用的经验。RSI 将模型修改、主动获取证据和后续任务表现放在同一个持续改进过程中。",
        "details": [
          {
            "title": "怎样比较三种改法",
            "text": "在相同任务、数据量和训练预算下，比较继续更新旧模型、增加预测模块，以及加入新观测或改变表征。用未参与训练的轨迹检验新环境预测、控制表现和旧环境恢复，再决定保留哪些改动。"
          },
          {
            "title": "模型更多，是否就懂得更多？",
            "text": "新增一个与旧模型相同结构的预测头，可能只是更容易学好某种条件。只有新结构或新信息让系统能够表达原来表达不了的关系，才说明可表达的范围扩大了。实验要分别检查这两种收益。"
          }
        ]
      },
      {
        "id": "feedback",
        "nav": "RSI 与回音室",
        "kicker": "RSI 支线 · 改进与回音室",
        "title": "让能力增长经得起新经验的检验",
        "lead": "模型影响机器人尝试哪些动作，真实反馈只来自这些已经执行的动作。信念与模型从中更新，又影响下一轮选择。RSI 要让这条相互依赖带来持续的能力增长，并用后续任务区分有效改进与回音室。",
        "body": [
          {
            "heading": "回音室怎样形成",
            "text": "假设机器人一直以很小的力度试探地面。几种接触模型在这种情况下都能给出相近预测，只有更换动作才会显出差别。如果机器人始终重复原来的动作，现有解释就可能不断得到支持，而不同解释始终没有被真正检验。"
          },
          {
            "heading": "分清“还没学好”和“目前学不会”",
            "text": "同一套输入和模型继续训练就能改善的部分，属于还没学好。如果缺少必要的接触信息，或者模型表达不了相应规律，就需要新观测、新表示或新的模型结构。RSI 要让系统判断下一轮应该继续学什么，以及什么时候要改变学习的对象。"
          },
          {
            "heading": "用行动取得有区别的反馈",
            "text": "当摩擦变化和负载变化都能解释已有经验时，选择让两种解释给出不同预测的动作，再观察实际响应。双重控制（Dual Control）把完成当前任务和获得有用信息一起考虑，使这次行动也帮助下一轮学习。"
          },
          {
            "heading": "让改进在新的经验中接受检验",
            "text": "更新后的系统要在未参与训练的动作和情境中检验：是否预测得更好，动作选择是否更有效，过去的能力是否保留下来。再用结果决定下一轮的数据采集、模型更新和表征扩展。这样，改进会改变下一轮如何学习。"
          }
        ],
        "takeaway": "RSI 的问题是怎样扩大可用能力；回音室的危险是把越来越集中的信念，当成越来越充分的理解。",
        "bridge": "身体运动、工具操作和他者交互都需要用实际结果检验预测。获得新的经验，再检查后续行动是否改善，这一过程贯穿三类任务。",
        "details": [
          {
            "title": "用一个分解区分三种预测误差",
            "text": "先固定要预测的任务和可供使用的信息。例如，在给定观测历史后预测下一步身体运动。\\(L_t\\) 是当前系统的平均预测误差。我们把它分成三部分：\\(H\\) 是即使充分利用这些信息仍无法消除的误差；\\(\\Delta_t\\) 是当前输入处理和模型结构表达不了的部分；\\(G_t\\) 是这些模型本来可以学会、但尚未学好的部分。\n\\[L_t=H+\\Delta_t+G_t.\\]\n继续训练尝试减少尚未学好的部分；增加有效信息或表达能力，可能减少目前表达不了的部分。这个分解帮助区分问题，不意味着可以直接从一条训练曲线读出三项的数值。"
          },
          {
            "title": "公式中“能做到最好”怎样定义",
            "text": "用 \\(X\\) 表示预先约定的全部可用信息，\\(Y\\) 表示同一个预测目标，\\(\\ell\\) 衡量预测与结果的差别。比较所有版本时，保持它们的评价情境和误差计算方式相同。\\(\\mathcal F\\) 包含基于 \\(X\\) 的所有允许预测方法；\\(\\mathcal F_t\\) 是当前输入接口和模型结构允许的方法，\\(f_t\\) 是已经学出的那个方法。\n\\[R(f)=\\mathbb E[\\ell(f(X),Y)],\\qquad f_t\\in\\mathcal F_t\\subseteq\\mathcal F.\\]\n\\[\\begin{aligned}H&=\\inf_{f\\in\\mathcal F}R(f),&B_t&=\\inf_{f\\in\\mathcal F_t}R(f),\\\\L_t&=R(f_t),&\\Delta_t&=B_t-H,\\qquad G_t=L_t-B_t.\\end{aligned}\\]\n\\(\\inf\\) 表示平均误差能接近的最低值。\\(B_t\\) 是把当前这类模型学到最好时能达到的水平；\\(H\\) 进一步允许使用全部约定信息和预测方法。例如，比较接入触觉前后，可让 \\(X\\) 始终包含触觉记录，而旧模型只使用其中的身体观测。于是新增信息对旧模型的帮助计入 \\(\\Delta_t\\)，比较基准保持不变。"
          },
          {
            "title": "主动学习怎样检验",
            "text": "比较重复任务动作、随机探索、固定试探与主动选择试探。记录区分模型需要多少次交互，以及修改后在新动作、环境变化和旧环境重现时的表现。持续激励研究动作是否提供足够的辨识信息；实际实验还要同时记录任务代价。"
          }
        ]
      }
    ]
  },
  "en": {
    "title": "From Self-Perception to Self-Improving World Models",
    "subtitle": "Use predictions to compare actions before execution, from the body to tools and other agents, and improve models and decisions through real feedback.",
    "sections": [
      {
        "id": "overview",
        "nav": "Research direction",
        "kicker": "Research proposal · November 2026",
        "title": "From Self-Perception to Self-Improving World Models",
        "lead": "An arm reaching for the same target can make a small or a large extension, bringing the hand to different positions. A world model predicts those outcomes; the task goal determines how to compare them, and the selected action is executed. Prediction makes unexecuted actions comparable. This is the basic idea of model-based control.",
        "body": [
          {
            "heading": "The model predicts outcomes; the goal determines the choice",
            "text": "In the online-planning illustration above, the model predicts the hand’s final position for each extension, and the target position is used to evaluate them. A different target can change the chosen action while the learned relation between arm actions and motion remains useful."
          },
          {
            "heading": "Learn the changes that affect a choice",
            "text": "To reach a target, the model needs the relation between actions and bodily motion. Tool use adds tool movement and contact outcomes. Learning can focus on the judgments needed for a task without first capturing every physical law of the external world."
          },
          {
            "heading": "Execution supplies real feedback",
            "text": "Only the selected action is executed, after which bodily feedback becomes available. Comparing the outcome with that prediction reveals discrepancies and adds experience for future choices. Outcomes of unexecuted actions remain model predictions."
          }
        ],
        "takeaway": "A world model supports action choices: predict consequences, evaluate them against a goal, and use real feedback to inform later decisions.",
        "bridge": "Predictions can support online planning before execution or help train a policy to choose actions. The next section explains these two routes into control.",
        "details": [
          {
            "title": "How the branches relate to the main thread",
            "text": "Proprioception and the Platonic Representation Hypothesis are developed in the perception branch. Tool use and predictive decisions explain how the body acts on the world; interaction with others introduces counterparts with autonomous behavior. RSI runs across all three, with model selection, updates within models, expanded expression, and active learning developed in its supporting page."
          },
          {
            "title": "Questions throughout the research",
            "text": "What does the system need to know for its current task? Which new information can existing bodily experience use? When action outcomes depart from expectations, should the system keep learning existing relations or expand its perception and models?"
          }
        ]
      },
      {
        "id": "prediction",
        "nav": "Prediction and decisions",
        "kicker": "01 · Model-based control",
        "title": "Use Predictions to Choose Actions",
        "lead": "A model connects the current state and a candidate action to possible outcomes. Its predictions can be compared online or used to train an action policy. Both routes connect task goals with action consequences and bring prediction into control.",
        "body": [
          {
            "heading": "Online planning: compare before executing",
            "text": "Model predictive control (MPC) uses a model to compare candidate action sequences against a goal and task constraints, executes the first step, then replans using new feedback. The small-versus-large extension illustration shows the basic idea of comparing outcomes before acting."
          },
          {
            "heading": "Train a policy through a model",
            "text": "Prediction can also enter training. SuperMimic learns a differentiable dynamics model and uses predicted body motion to train an action policy. Model-generated trajectories offer another way to train policies. The learned policy then produces actions, turning model-provided experience into control capability."
          },
          {
            "heading": "A different goal changes the evaluation",
            "text": "The same predicted consequences can be evaluated against different task goals. If the arm is asked to reach another position, that new target changes the ranking of actions. Predicting how actions change state and specifying which outcome the task seeks play distinct roles."
          },
          {
            "heading": "Retain information that matters for action choices",
            "text": "The model needs to capture changes that affect the current choice. Evaluation records prediction error, action selection, and task performance together: does a better prediction change the action selected, and does that change help achieve the goal?"
          }
        ],
        "takeaway": "The model predicts consequences, and the goal gives those outcomes value. Online planning or policy training turns the two into action.",
        "bridge": "Begin with the body: the robot produces joint actions and receives feedback about position, velocity, and posture. The body therefore offers a ready starting point for learning action consequences.",
        "details": [
          {
            "title": "The representation–dynamics interface",
            "text": "An encoder forms the current state representation from the observations and actions already available. A dynamics model receives that representation and a candidate action, then predicts subsequent changes. History can supply information that a single current observation lacks. Let \\(h_t=(o_0,a_0,o_1,\\ldots,a_{t-1},o_t)\\) be the available history, with current observation \\(o_t\\). The encoder produces state \\(z_t=E_{\\phi_t}(h_t)\\), where \\(\\phi_t\\) is its parameter set. \\(F_{\\theta_t}(z_t,a)\\) predicts the consequence of candidate action \\(a\\), using model parameters \\(\\theta_t\\); the executed action is \\(a_t\\)."
          },
          {
            "title": "Connecting prediction to control",
            "text": "Compare three paths: training an action policy through a differentiable model, training a policy with model-generated trajectories, and comparing action sequences online with model predictive control (MPC). The actor produces actions; the critic evaluates long-term task returns."
          },
          {
            "title": "Evaluating models and decisions together",
            "text": "Under common task and data conditions, record one-step and multi-step prediction, action rankings, control performance, and computational cost. Examine whether the model captures factors that affect action choice and whether its predictions remain useful under new interaction conditions."
          }
        ]
      },
      {
        "id": "perception",
        "nav": "Body and action",
        "kicker": "02 · Self",
        "title": "The Body Provides Actions and Feedback",
        "lead": "A robot can produce joint actions and continuously receive feedback about position, velocity, and posture. A body model connects these states and actions to predictions of its own motion. Proprioceptive experience can directly support some control tasks and provides a baseline for comparing added vision or touch.",
        "body": [
          {
            "heading": "Predict motion from directly available body state",
            "text": "Joint positions, velocities, and posture are close to the quantities control needs to regulate. A body model uses them to predict motion after an action, and a policy uses that experience to support standing, walking, or arm movements. The proprioception branch develops this direct connection and the tasks it can support."
          },
          {
            "heading": "Compare added senses within the same task",
            "text": "Retain a proprioception-only baseline for the task, then add touch, vision, or both. Record changes in action prediction and control to identify which added information helps choices. New senses can thus be connected around existing body capabilities."
          },
          {
            "heading": "The Platonic hypothesis: different senses record the same interaction",
            "text": "The Platonic Representation Hypothesis proposes that internal representations across models and modalities may converge. Using the same contact events, study whether vision, touch, and proprioception share useful structure and how those connections help an existing body system use new information."
          },
          {
            "heading": "Test the connection through lightweight integration",
            "text": "A lightweight adapter experiment tests two questions together: whether an added sense helps the task and whether its representation can connect with existing body representations. Cross-modal prediction, joint learning, JEPA, and multiple views provide further comparisons developed in the Platonic representation branch."
          }
        ],
        "takeaway": "The body connects its own actions with available feedback. Whether proprioception suffices and whether added senses help can be compared within the same control task.",
        "bridge": "Knowing where the hand will move is not yet enough to determine whether a held rod will reach a target. The tool transmits bodily motion outward, extending the consequences to predict to its tip and the contacted object.",
        "details": [
          {
            "title": "Two perception branches",
            "text": "The bodily-experience branch asks which local information about the agent already supports action. The Platonic representation branch examines connections among vision, touch, and proprioception, and how an existing system can use new information."
          },
          {
            "title": "A shared near-term experiment",
            "text": "Under matched tasks and budgets, retain a proprioception-only baseline and compare lightweight tactile integration, visual input, and joint learning. Record task gains, data requirements, and retention of existing capabilities so that the contribution of additional information can be compared."
          }
        ]
      },
      {
        "id": "manipulation",
        "nav": "From body to tools",
        "kicker": "03 · World · Body → Tools",
        "title": "Tools Carry Bodily Action into the World",
        "lead": "Once a tool is grasped, arm motion moves its tip, and contact can change both the object and the body. The same arm action can have different external consequences with a different rod length or grasp. Touching and pushing with a held rod bring these consequences into prediction while retaining a proprioception-only starting point for comparison.",
        "body": [
          {
            "heading": "The body still produces the action",
            "text": "A grasp connects the tool to the body. Arm actions change the rod tip’s movement, and contact can change the body’s response. Study whether this connection between action and feedback can support the predictions needed for a tool task."
          },
          {
            "heading": "Learn tool consequences from bodily actions and feedback",
            "text": "Begin with reaching a specified target through contact, then add pushing. Study what joint states, action history, and bodily responses can teach the system. Tool-tip motion and contact results are action outcomes against which task performance is evaluated."
          },
          {
            "heading": "A tool change alters the consequences of the same action",
            "text": "Vary rod length, grasp position, or contact conditions and observe which actions previous experience still supports. Study whether further interaction lets the system learn these changes and which tasks continue to require information it has yet to acquire."
          },
          {
            "heading": "When a gap appears, compare ways to address it",
            "text": "For difficult tasks, compare further training, longer history, changes to predictive models, and added touch or vision. Concrete manipulation outcomes help determine whether the system needs better learning or new information and representations."
          }
        ],
        "takeaway": "World extends the consequences being predicted: bodily action affects external objects through a tool, and manipulation tasks test what proprioception and additional senses each contribute.",
        "bridge": "Actions can also affect another agent with its own goals. That agent chooses a response, which changes the outcome. Prediction must then account for the counterpart’s choices as well.",
        "details": [
          {
            "title": "A progression of manipulation experiments",
            "text": "Begin with target contact using a fixed tool, then add pushing and tool changes. Online control initially uses a specified set of proprioceptive inputs; task evaluation records tool-tip motion, contact outcomes, and success. Add vision or touch individually to compare their contribution."
          },
          {
            "title": "Learn relations around the task",
            "text": "Compare proprioception-only models with models receiving additional observations, and study which tool relations can be learned from action history. Treat missing information, incomplete training, and limited expression as explanations to compare through subsequent tasks and alternative changes."
          }
        ]
      },
      {
        "id": "coordination",
        "nav": "Modeling other agents",
        "kicker": "04 · Others",
        "title": "Learning a World Model That Includes Other Agents",
        "lead": "When an action affects another agent, the counterpart’s response helps determine the outcome. Moving forward, slowing down, or waiting changes the situation it faces; it then chooses according to its own goals. Others brings this autonomous response into predictions of action consequences.",
        "body": [
          {
            "heading": "Predict responses to our actions",
            "text": "In a shared corridor, moving forward, slowing down, or waiting may elicit different actions from the other robot. Use interaction history to predict their response to each candidate action and the state both robots may reach next."
          },
          {
            "heading": "Test the prediction through interaction",
            "text": "Choose an action using the prediction, then observe how the other robot actually responds. The interaction advances the task and provides new evidence about behavior. Compare the response with the prediction to assess what the model explains and what evidence is still needed."
          },
          {
            "heading": "Revise or expand the interaction model",
            "text": "When familiar behavior returns, an existing model may be reused. When behavior changes persistently, study model updates, new prediction modules, or longer interaction histories. The changes to explain now also include the counterpart’s choices in response to interaction."
          },
          {
            "heading": "Use improved predictions in the next decision",
            "text": "In tasks such as yielding or carrying an object together, test whether the updated model helps choose better actions. Measure both response prediction and its effects on waiting, conflicts, and task completion."
          }
        ],
        "takeaway": "Others expands what the world model must understand. Prediction, action, feedback, and model revision continue, now with agents whose responses depend on the interaction.",
        "bridge": "Predictions about the body, tools, and other agents face the same learning problem: the system observes actual outcomes only for executed actions, while its model influences which actions it tries. RSI studies how this dependence can support continuing capability improvement.",
        "details": [
          {
            "title": "How to evaluate a model of another agent",
            "text": "First hold terrain and load fixed and vary the other agent’s movement or yielding policy. Compare a fixed predictor, online adaptation, and new interaction models. Then add physical changes and test how the system separates these changes and reuses models when familiar behavior returns."
          },
          {
            "title": "Our actions also shape the evidence",
            "text": "A robot that always waits obtains little evidence about how the other agent responds when it moves forward. Active learning compares the information provided by different constrained actions and evaluates revised behavior predictions in later interactions."
          }
        ],
        "extension": {
          "title": "Further reading: coordination under shared constraints",
          "lead": "Given an interaction model, a further decision problem is how several robots coordinate under shared space and resource constraints. Finite modes, generalized Nash equilibria (GNE), and variational equilibria (VGNE) address that problem.",
          "details": [
            {
              "title": "The mathematical objects in finite coordination",
              "text": "For one decision at a given current state, \\(u=(u_1,\\ldots,u_N)\\) is the joint decision of \\(N\\) agents and \\(\\mathcal X\\) is the set satisfying shared constraints. The coordinator broadcasts mode \\(m\\) from \\(B\\) choices, assigning local feasible set \\(\\mathcal X_i(m)\\) to agent \\(i\\).\n\\[\\begin{aligned}\\mathcal Q_m&=\\prod_{i=1}^{N}\\mathcal X_i(m)\\subseteq\\mathcal X,\\\\ \\mathcal X_{\\mathrm{modes}}&=\\bigcup_{m=1}^{B}\\mathcal Q_m.\\end{aligned}\\]\n\\(\\mathcal Q_m\\) contains every combination of local choices under mode \\(m\\); its inclusion in \\(\\mathcal X\\) ensures that these choices satisfy the current shared constraints. The union \\(\\mathcal X_{\\mathrm{modes}}\\) is the region covered by all modes. Study how coverage error changes with \\(B\\). In immediate control, \\(u_i\\) is agent \\(i\\)’s action; in trajectory planning, it is an action sequence."
            },
            {
              "title": "Equilibrium, safety, and model learning",
              "text": "For given models and shared constraints, study equilibrium existence, uniqueness, and convergence of distributed algorithms. Then examine equilibrium–social optimum gaps under conditions such as strong monotonicity. Robust control, control barrier functions (CBFs), or higher-order CBFs express constraints during exploration, with model uncertainty and control feasibility included in the design."
            },
            {
              "title": "A template for equilibrium deviation",
              "text": "Let \\(u\\) denote joint actions at one decision time, or plans over a common horizon. Agent \\(i\\) has cost \\(J_i(u)\\); \\(J_{\\mathrm{soc}}\\) is total cost. The map \\(\\Psi\\) collects each agent’s cost gradient with respect to its own decision:\n\\[\\begin{aligned}\\Psi(u)&=\\operatorname{col}_{i=1}^{N}\\nabla_{u_i}J_i(u),\\\\ J_{\\mathrm{soc}}(u)&=\\sum_{i=1}^{N}J_i(u).\\end{aligned}\\]\nFix the same nonempty closed convex feasible set \\(\\mathcal X\\). Assume differentiable costs \\(J_i\\), convex in each agent’s own decision, and a differentiable convex total cost. Suppose a variational equilibrium \\(u^{\\mathrm{VE}}\\) and social optimum \\(u^\\star\\) exist. The equilibrium satisfies \\(\\langle \\Psi(u^{\\mathrm{VE}}),u-u^{\\mathrm{VE}}\\rangle\\ge0\\) for every \\(u\\in\\mathcal X\\); the optimum minimizes total cost over that set. If \\(\\Psi\\) satisfies the following strong-monotonicity condition, the deviation bound follows:\n\\[\\begin{gathered}\\langle \\Psi(u)-\\Psi(v),u-v\\rangle\\ge\\mu\\|u-v\\|_2^2,\\\\ u,v\\in\\mathcal X,\\qquad\\mu>0,\\\\ \\delta=\\|\\Psi(u^\\star)-\\nabla J_{\\mathrm{soc}}(u^\\star)\\|_2,\\\\ \\|u^{\\mathrm{VE}}-u^\\star\\|_2\\le\\delta/\\mu.\\end{gathered}\\]\n\\(\\delta\\) measures the gap between individual and social marginal costs at the social optimum; \\(\\mu\\) is the strong-monotonicity constant and \\(\\|\\cdot\\|_2\\) is the Euclidean norm. This template connects those quantities to equilibrium displacement. The research asks how its conditions hold in concrete tasks. Mode-coverage error is evaluated separately above."
            }
          ]
        }
      },
      {
        "id": "rsi",
        "nav": "Experience and improvement",
        "kicker": "Across Self / World / Others · RSI",
        "title": "Use Experience to Improve Later Decisions and Learning",
        "lead": "Actual feedback comes only from actions that were executed. Current beliefs—the relative trust assigned to candidate predictive models—influence what the system tries. Those attempts produce evidence that changes models and later choices. This dependence runs across Self, World, and Others. Recursive self-improvement (RSI) studies whether these changes can keep expanding the system’s useful capabilities.",
        "body": [
          {
            "heading": "Action choices also determine learning experience",
            "text": "If the arm executes only the small extension, it obtains the actual outcome of that action; the large extension still has only a prediction. The same applies to tool use and interaction with other agents. Models learn from the experience obtained and may continue to lack evidence under other actions."
          },
          {
            "heading": "Select among models and keep each model learning",
            "text": "The same action can have different consequences under different conditions, motivating several candidate explanations. Berk–Nash provides a theoretical entry into the interaction among beliefs, actions, and experience. We consider prioritizing the model with the highest belief. New feedback updates beliefs and supports fast and slow learning within each model, addressing recent changes while retaining longer-term experience."
          },
          {
            "heading": "Distinguish incomplete learning from limited expression",
            "text": "When mismatch persists, study whether an existing model needs more learning or lacks the capacity to express the phenomenon. Compare further training, new predictors, and expanded observations or representations, using subsequent tasks to assess what should change and whether the change expands useful capability."
          },
          {
            "heading": "Judge improvement through later capabilities",
            "text": "Changed parameters and more concentrated beliefs are changes within the learning process. RSI aims for those changes to improve later decisions and learning. Active probes provide experience that distinguishes explanations; new actions, new conditions, and previous tasks then test prediction, control, and capability retention to establish whether the system gains lasting benefits."
          }
        ],
        "takeaway": "Continuing updates provide the basis for self-improvement. RSI evaluates whether they develop capability by improving subsequent action and learning.",
        "bridge": "The experiments need to observe these effects separately: how predictions change action choices, what proprioception and added senses contribute, and how model updates or expansion affect subsequent capabilities.",
        "details": [
          {
            "title": "Three questions in the RSI branch",
            "text": "The RSI page develops three questions: how beliefs select models and models update at different timescales; how inadequate models can expand; and how action can produce informative experience. The main page explains the basic process from prediction to decisions. Multiple experts, IMM, MoE, and active learning are compared here as specific methods."
          },
          {
            "title": "Evaluate improvement across interaction rounds",
            "text": "Retain each round’s models, training experience, and subsequent task performance to compare further training with changes in model capacity. Test reuse of previous knowledge when tools and environments return, and record the computational and learning costs of new models."
          }
        ]
      },
      {
        "id": "experiments",
        "nav": "Experimental roadmap",
        "kicker": "05 · Research program",
        "title": "Organize Experiments Around Growing Action Capabilities",
        "lead": "Six experiment groups follow the same causal chain: information enters a model, predictions inform action choices, and actual outcomes contribute to learning. Body, tool, and other-agent tasks provide different prediction targets; comparisons of perception, model selection, and capability expansion examine which changes produce task benefits.",
        "body": [
          {
            "heading": "Retain the proprioceptive baseline through tool use",
            "text": "First reproduce body control, then study whether proprioceptive actions and feedback can support learning to touch and push with a held rod. Compare vision, touch, and lightweight integration to identify which tasks benefit from additional perception."
          },
          {
            "heading": "Test learning mechanisms across tasks",
            "text": "Vary tools, contact conditions, and others’ behavior to compare model selection, fast and slow updates within models, and expanded expressive capacity. Active probes help distinguish explanations, and subsequent tasks test acquired capabilities. The same comparisons can also be made in bodily-motion tasks."
          }
        ],
        "takeaway": "Record prediction error, action choices, and subsequent task performance together to explain how changes in models and learning translate into action capabilities.",
        "bridge": "These experiments test whether predictions help the robot choose better actions and whether model updates extend that benefit to new tasks.",
        "details": [
          {
            "title": "Common records",
            "text": "Retain task definitions, environmental parameters, model versions, observation and action interfaces, and training/evaluation splits. Across stages, record prediction, control, learning costs, and retention of existing capabilities."
          },
          {
            "title": "Research questions and their experiments",
            "text": "Body, tool, and other-agent experiments address the objects of understanding. Perceptual integration studies available information and its representations; model selection, updates, and expansion study continuing learning. These dimensions can be compared within the same task; numbering organizes the experiments."
          }
        ],
        "stages": [
          {
            "name": "01 · Body and perception foundation",
            "question": "Which actions can local knowledge of the body support?",
            "design": "Reproduce the body-control foundation. Compare proprioception, vision, and their combination in standing and walking tasks, recording body state, actions, and actual feedback.",
            "readout": "Body-response predictions, action choices, task performance, and disturbance recovery, together with perception and learning costs.",
            "next": "Retain reusable body capabilities and identify tasks that merit additional senses."
          },
          {
            "name": "02 · Connect modalities to the body",
            "question": "When do vision and touch add value, and how can they connect to the body?",
            "design": "Retain a proprioception-only baseline, then compare vision, touch, lightweight adapters, cross-modal prediction, and joint learning. Use multiple-view conditions to examine the value of additional observations.",
            "readout": "Cross-modal connections, data needed for integration, action prediction, and control performance.",
            "next": "Retain interfaces that benefit the task while keeping proprioception alone as a starting point for tool-use comparisons."
          },
          {
            "name": "03 · From body to tool manipulation",
            "question": "How do bodily actions affect tools and objects, and how much prediction and control can proprioceptive feedback support?",
            "design": "Begin with touching and pushing using a held rod, initially testing proprioception and action history. Vary rod length, grasp position, and contact conditions, then compare the contribution of added touch or vision.",
            "readout": "Tool-tip and contact-outcome predictions, actions selected using them, manipulation performance, and reuse of bodily experience.",
            "next": "Accumulate manipulation experience and identify changes that require model adaptation."
          },
          {
            "name": "04 · RSI: model selection and updates",
            "question": "How can the system select useful models while each model learns at appropriate timescales?",
            "design": "Introduce switching and recurring conditions in body, tool, or other-agent tasks. Compare highest-belief selection, IMM, and MoE, and independently vary the update timescales of the world models themselves.",
            "readout": "Beliefs in relation to subsequent performance, switching delay, model learning speed, and recovery of familiar conditions.",
            "next": "Identify cases that remain difficult after selection and learning within existing models."
          },
          {
            "name": "05 · RSI: expression and echo chambers",
            "question": "Has the system gained a capability or only become more confident in its existing models?",
            "design": "Introduce changes that existing models struggle to describe. Compare further training, new predictors, and expanded perception or representations, alongside passive experience and active probes.",
            "readout": "Performance on held-out operations, predictions for untried actions, retention of prior capabilities, belief changes, and learning costs.",
            "next": "Establish repeated improvement through experience, model changes, and tests in further actions."
          },
          {
            "name": "06 · Others’ responses and interaction",
            "question": "How can the system keep learning action outcomes when a counterpart chooses how to respond?",
            "design": "Change the other agent’s strategy in shared passages or joint manipulation. Compare fixed predictions, model updates, and new interaction models; first hold physical conditions fixed, then vary them.",
            "readout": "Response prediction, adaptation to behavioral changes, task performance, and conflicts.",
            "next": "Extend perception, action, and RSI to counterparts with independent decisions."
          }
        ]
      },
      {
        "id": "framework",
        "nav": "Unified framework",
        "kicker": "06 · The complete loop",
        "title": "Connect Prediction, Choice, and Learning",
        "lead": "A model makes unexecuted actions comparable through their predicted consequences, and the task goal determines the choice. Prediction extends from bodily motion to tool effects and others’ responses, while real feedback continually tests the model. The research follows how this predictive capacity helps action and develops through experience.",
        "body": [
          {
            "heading": "One decision idea with an expanding scope of prediction",
            "text": "Self predicts the agent’s own body. World predicts the external effects of bodily action through tools. Others predicts responses from counterparts with their own goals. Existing proprioceptive experience can remain useful, while vision and touch are compared as additional information and the Platonic representation branch examines how different experiences connect."
          },
          {
            "heading": "Use feedback to support more effective future action",
            "text": "Executed actions produce real evidence that changes models and beliefs. Each model continues to learn at fast and slow timescales; persistent mismatch motivates comparisons of broader information or expression. RSI studies whether these changes improve later choices, adaptation, and learning, with subsequent tasks testing the capability gains."
          }
        ],
        "takeaway": "The value of prediction appears in action choices; the value of self-improvement appears in subsequent action and learning.",
        "bridge": "Use action choices, adaptation speed, and retention of previous capabilities in subsequent tasks to judge whether the models help the system act and learn.",
        "details": [
          {
            "title": "Comparing model versions",
            "text": "Representation expansion may change the encoder’s inputs, structure, and parameters. Within a version, residuals use the same \\(E_{\\phi_t}\\). Across versions, evaluate improvement through a common task, physical target, or fixed target encoding. This connects the structural changes in model generation to a consistent evaluation scale."
          },
          {
            "title": "The main thread and the RSI formalization",
            "text": "Self, World, and Others provide tasks and objects of understanding. Prediction, action, and feedback form their shared process. The model, belief, and update expressions below develop selection, learning, and capability expansion within RSI."
          }
        ],
        "equations": [
          {
            "label": "Perceive",
            "formula": "z_t=E_{\\phi_t}(h_t)",
            "description": "Encode the history available before the current action into a latent state. \\(\\phi_t\\) denotes the current encoder parameters."
          },
          {
            "label": "Predict",
            "formula": "\\widehat z_{t+1\\mid t}^{(k)}(a)=F_{\\theta_{k,t}}(z_t,a)",
            "description": "Each candidate in \\(\\mathcal M_t=\\{F_{\\theta_{k,t}}\\}_{k=1}^{K_t}\\) predicts the consequences of an action \\(a\\) being considered."
          },
          {
            "label": "Select and act",
            "formula": "\\begin{aligned}k_t^\\star&\\in\\arg\\max_k b_t^{(k)},\\\\a_t&=\\pi(z_t,F_{\\theta_{k_t^\\star,t}},g_t).\\end{aligned}",
            "description": "\\(b_t^{(k)}\\) is the belief in model \\(k\\), and \\(k_t^\\star\\) identifies the selected model. Policy \\(\\pi\\) uses its predictions and task goal \\(g_t\\) to select an action."
          },
          {
            "label": "Observe feedback",
            "formula": "\\begin{aligned}e_{t+1}^{(k)}={}&E_{\\phi_t}(h_{t+1})\\\\ &-\\widehat z_{t+1\\mid t}^{(k)}(a_t)\\end{aligned}",
            "description": "\\(e_{t+1}^{(k)}\\) is model \\(k\\)’s prediction residual. Use the same encoder for this prediction and new feedback; update the representation after the comparison."
          },
          {
            "label": "Learning within models",
            "formula": "\\theta_{k,t+1}=U_{k,t}(\\theta_{k,t},h_{t+1})",
            "description": "\\(U_{k,t}\\) is model \\(k\\)’s learning rule for this round. Fast and slow refer to how that model absorbs and retains experience. A separate belief update determines which model to trust next."
          },
          {
            "label": "Evolve",
            "formula": "\\mathcal S_{t+1}=\\mathcal U(\\mathcal S_t,h_{t+1})",
            "description": "\\(\\mathcal S_t=(E_{\\phi_t},\\mathcal M_t,\\mathbf b_t)\\) contains the representation, model library, and beliefs. \\(\\mathcal U\\) collects learning and belief updates, adding models, revising representations, or merging redundant models when needed."
          }
        ],
        "questions": [
          "Self: which actions can an existing body model and proprioception support?",
          "Perception: can representations across senses connect, and how does new information help the task?",
          "World: how does the body act on external objects through tools, and how does prediction guide action?",
          "RSI · Updates: how should candidate models be selected and continue learning?",
          "RSI · Expansion: when must expressive capacity expand, and how can new experience test real improvement?",
          "Others: how can action outcomes be predicted and tested when a counterpart chooses its response?"
        ],
        "symbols": [
          {
            "symbol": "o_t=(o_t^p,o_t^v,o_t^h)",
            "meaning": "Proprioceptive, visual, and tactile observations; each stage uses the modalities already connected."
          },
          {
            "symbol": "h_t",
            "meaning": "Interaction history: \\(h_t=(o_0,a_0,o_1,\\ldots,a_{t-1},o_t)\\). Observe first, then choose the current action."
          },
          {
            "symbol": "\\phi_t,\\ \\theta_{k,t}",
            "meaning": "Parameters of the current encoder and of dynamics model \\(k\\); \\(t\\) identifies the version in use."
          },
          {
            "symbol": "k,\\ K_t",
            "meaning": "Candidate model index and current number of models."
          },
          {
            "symbol": "a,\\ a_t",
            "meaning": "A candidate action and the action actually executed."
          },
          {
            "symbol": "\\widehat z_{t+1\\mid t}^{(k)},\\ e_{t+1}^{(k)}",
            "meaning": "Next-state prediction and prediction residual computed after receiving feedback."
          },
          {
            "symbol": "\\mathbf b_t,\\ g_t",
            "meaning": "The vector of beliefs over candidate models, and the current task goal."
          }
        ]
      },
      {
        "id": "body",
        "nav": "Body and experience",
        "kicker": "Perception branch · Bodily experience",
        "title": "Proprioception Directly Connects Action and Feedback",
        "lead": "Joint positions, velocities, and posture give a robot continuing feedback about its own motion. These states are close to the quantities regulated in standing, walking, and arm control, allowing a body model to learn action consequences. This branch starts from that direct connection and compares tasks supported by proprioception alone with the gains from additional senses.",
        "body": [
          {
            "heading": "Proprioception directly supplies information for body control",
            "text": "Joint positions and velocities, posture, and body motion correspond directly to quantities that standing and walking require the robot to regulate. Vision must infer relevant states from images, while proprioception supplies a continuous stream of information close to body control. For these tasks, bodily experience may therefore offer a more direct and effective starting point for learning."
          },
          {
            "heading": "Action can begin with local understanding",
            "text": "Blind people can walk with the help of proprioception, balance, and touch. This motivates a research approach grounded in the body and its immediate experience: learning how the body moves and responds to actions can support maintaining posture and taking steps. Useful understanding can develop within this local scope and expand through experience."
          },
          {
            "heading": "Start with body prediction through SuperMimic",
            "text": "SuperMimic learns a differentiable dynamics model and uses it to train a motion policy. Starting from this capability, we compare how vision and touch connect with the existing body system and how they help action prediction and control."
          },
          {
            "heading": "Compare additional senses where the task calls for them",
            "text": "After a slipping step, proprioception already records the body’s actual response. First test what adaptation this feedback can support, then compare whether information from vision or touch further improves the task. The same comparison in tool use identifies conditions where additional perception helps."
          }
        ],
        "takeaway": "Proprioceptive experience can directly support action. Study how far it reaches and under which conditions additional perception helps.",
        "bridge": "The body model is the starting point for Self. Tool manipulation on the main page studies how these capabilities act on external objects, while the Platonic representation branch tests how additional senses connect with bodily experience.",
        "details": [
          {
            "title": "The body-model interface",
            "text": "First specify body states, control actions, recent motion history, and prediction targets, and establish reproducible prediction and control baselines. Compare proprioception alone with added modalities to identify what the additional information contributes. Body state is \\(s_t\\), and the applied action is \\(a_t\\). \\(\\widehat s_{t+1\\mid t}\\) predicts the next body state using information available at time \\(t\\); the hat marks a prediction."
          },
          {
            "title": "Foundation training and the proposed extension",
            "text": "SuperMimic updates its dynamics model and policy across training iterations, holding the dynamics model fixed during policy updates. We propose first retaining the existing body foundation while training encoders and interfaces for new senses, then comparing joint training."
          },
          {
            "title": "A robotics example of starting with proprioception",
            "text": "In Learning Quadrupedal Locomotion over Challenging Terrain, Lee and colleagues use a history of proprioceptive observations to drive a quadruped’s locomotion policy, demonstrating traversal of challenging terrain without external visual input. This provides a concrete example of building action capabilities from feedback about the robot’s own motion."
          }
        ]
      },
      {
        "id": "representation",
        "nav": "Platonic representations",
        "kicker": "Perception branch · Platonic representations",
        "title": "Let Different Senses Describe the Same Interaction",
        "lead": "Vision, touch, and proprioception record different aspects of the same interaction. The Platonic Representation Hypothesis motivates the search for structure that can be used across these experiences. Lightweight integration, cross-modal prediction, and manipulation experiments jointly test representational connections and the task benefits of additional information.",
        "body": [
          {
            "heading": "Compare senses through the same contact event",
            "text": "When a foot slips, images record its motion relative to the ground, touch records contact changes, and joint sensors record the body’s response. Pair these observations from the same slip, then test whether representations learned from one sense help predict changes recorded by another and improve action choices."
          },
          {
            "heading": "Introduce touch through a lightweight adapter",
            "text": "Retain the body-control system and use a small adapter to bring tactile information into its existing state representation. Compare simple integration with joint learning to establish how much change is needed to use the new sense. This examines both capability expansion and how readily connections can be learned between sensory representations."
          },
          {
            "heading": "Use JEPA to learn representations for predicting change",
            "text": "JEPA learns by predicting internal representations. We explore whether it can help vision, touch, and bodily experience retain information useful for predicting the next interaction, then use actual tasks to test whether that information helps the robot choose actions."
          },
          {
            "heading": "Several viewpoints on the same space",
            "text": "Different cameras observe the same interaction from different positions. Connect their observations with the body’s position and examine whether the system can recognize the same contact relations across viewpoints and use additional views to improve prediction."
          }
        ],
        "takeaway": "A shared physical interaction connects the senses. Lightweight integration, prediction across modalities, and task performance make those connections testable.",
        "bridge": "These experiments provide evidence for integrating senses with the body. Their results feed into the body and tool tasks on the main page, testing whether connected representations help action prediction and decisions.",
        "details": [
          {
            "title": "Comparisons for tactile integration",
            "text": "Compare no touch, direct concatenation, a linear map or lightweight adapter, jointly learned representations, and jointly learned representations and dynamics. Track prediction, control, data requirements, and parameter costs to examine how effectively each approach uses the additional information."
          },
          {
            "title": "JEPA and action-conditioned prediction",
            "text": "In an action-conditioned temporal design, a target encoder supplies the representation of a future observation, and a predictor estimates it from the current representation and action. Video representation learning and action-conditioned training are separate stages. V-JEPA 2-AC provides a reference for action-conditioned post-training and planning; the robotics study also needs the relevant action and tactile interfaces."
          },
          {
            "title": "Multiple views and task feedback",
            "text": "The multi-view study covers relative camera poses, alignment across views, relations between 2D features and 3D space, and transformations between camera and body coordinates. Task feedback helps compare which information in a representation supports predicting interaction outcomes and choosing actions."
          }
        ]
      },
      {
        "id": "adaptation",
        "nav": "Belief and model learning",
        "kicker": "RSI branch · Selection and updates",
        "title": "Select Models from Experience and Keep Them Learning",
        "lead": "The same action has different consequences on dry and wet ground. A robot can retain several predictive models and use experience to decide which one to trust now. That choice shapes its next action and the experience it can obtain.",
        "body": [
          {
            "heading": "Berk–Nash: beliefs, actions, and experience shape one another",
            "text": "A robot acts using the model it trusts, then judges that model using the feedback its actions produce. Berk–Nash studies this relationship: even a misspecified model can find support in the experience an agent actually encounters and sustain the agent’s behavior."
          },
          {
            "heading": "Start with the predictive model that has the highest belief",
            "text": "Belief expresses relative trust in each candidate given past experience. The initial design selects the model with the highest belief to compare action outcomes. After observing the actual outcome, the system compares it with each model’s earlier prediction and updates its beliefs. A better-supported model can take over."
          },
          {
            "heading": "Fast and slow updates happen within each world model",
            "text": "Each world model also continues to learn. Fast updates absorb new experience and adjust near-term predictions; slow updates retain more stable regularities from repeated experience. A brief slip calls for a prompt adjustment, while experience accumulated on wet ground should remain useful on a later visit. The question is how each model learns, retains, and forgets."
          },
          {
            "heading": "Multiple experts can implement the candidate models",
            "text": "Prediction heads can share an encoder, or separate adapters can retain different learned regularities. IMM offers observation-based mode-probability updates; MoE learns to select or combine experts. These methods support comparisons of model selection, while fast and slow learning take place within the models themselves."
          }
        ],
        "takeaway": "Belief determines which model supplies the prediction. Fast and slow updates determine how each world model learns from experience.",
        "bridge": "Selection and updates work with existing models. Model expansion addresses cases they cannot cover, while active learning studies how to obtain experience that distinguishes explanations. Together they form part of RSI.",
        "details": [
          {
            "title": "Notation for belief and selection",
            "text": "Let \\(b_t^{(k)}\\) be the belief assigned to model \\(k\\) at time \\(t\\), and let \\(K_t\\) be the number of candidates. The main path selects model \\(k_t^\\star\\) to support the next decision:\n\\[b_t^{(k)}\\ge0,\\quad \\sum_{k=1}^{K_t}b_t^{(k)}=1,\\qquad k_t^\\star\\in\\arg\\max_k b_t^{(k)}.\\]\nSelecting the highest-belief model is a design choice here. Berk–Nash requires optimal behavior given beliefs, with belief supported on models that best fit the data those behaviors generate; the paper measures fit through KL divergence. It does not require selecting a single highest-belief model."
          },
          {
            "title": "Comparing learning timescales",
            "text": "Hold the model count and selection mechanism fixed while comparing a single update timescale with fast and slow updates, then vary the selection mechanism. Track each model’s predictions, recovery after brief disturbances, learning under sustained changes, and performance when an earlier environment returns. Update frequency, data windows, and learning strength are implementation choices to compare."
          },
          {
            "title": "What IMM and MoE contribute",
            "text": "An IMM cycle mixes initial state estimates, predicts and corrects each model’s state estimate using observations, updates mode probabilities, and combines estimates. An MoE gate produces expert weights. These weights allocate experts; interpreting them as beliefs requires a corresponding probability model or calibration evidence."
          }
        ]
      },
      {
        "id": "generation",
        "nav": "Limits of representation",
        "kicker": "RSI branch · Expanding expression",
        "title": "The most trusted model may still be unable to describe what happens",
        "lead": "Model selection compares explanations already available. On soft ground, every model may predict incorrectly, yet one will still have the highest belief. Has it simply not learned enough, or do its inputs and the relationships it can represent leave something out?",
        "body": [
          {
            "heading": "The model can express it but has not learned it yet",
            "text": "Keep the inputs and structure and update the model with new experience. For example, the same contact relationship may still apply while friction has changed. If further learning improves subsequent predictions, the existing model mainly needs to adapt."
          },
          {
            "heading": "Learn a new regularity while retaining old experience",
            "text": "When contact behavior differs substantially from previous environments, an added prediction head or adapter can learn the new response while earlier models remain available for later visits. Compare this with further training of the existing model to determine whether another model, and which structure, is needed."
          },
          {
            "heading": "Repeated training cannot supply a distinction the inputs omit",
            "text": "Suppose two contacts look identical in the available observations but lead to different movements because of an unobserved contact condition. The model has no basis for telling them apart. Touch may reveal pressure and slip, while a longer history may reveal a missed change. The model then needs access to different information and a representation that uses it."
          },
          {
            "heading": "Connect new senses with the existing body model",
            "text": "When adding touch, we ask whether it can connect with body and visual experience so that previously indistinguishable contacts become understandable. This links representation to model generation: can new experience extend the range of phenomena the system can predict?"
          }
        ],
        "takeaway": "After selecting the most trusted explanation, ask whether the available models can represent the phenomenon at all.",
        "bridge": "Model expansion needs experience that can test its value. RSI connects model changes, active evidence gathering, and subsequent task performance within one process of improvement.",
        "details": [
          {
            "title": "Comparing the three changes",
            "text": "Under matched tasks, data volumes, and training budgets, compare further updates of the existing model, an added predictor, and new observations or representations. Use held-out trajectories to assess predictions and control in the new environment and recovery in previous environments before retaining a change."
          },
          {
            "title": "Do more models mean more understanding?",
            "text": "An extra head with the same structure may simply make one condition easier to learn. The range of expressible relationships expands only when new structure or information permits a relationship the system could not previously express. Experiments should examine these benefits separately."
          }
        ]
      },
      {
        "id": "feedback",
        "nav": "RSI and echo chambers",
        "kicker": "RSI branch · Improvement and echo chambers",
        "title": "Test Capability Growth Against New Experience",
        "lead": "A model influences which actions a robot tries, and actual feedback comes only from those executed actions. Beliefs and models update from that experience and influence the next choice. RSI aims for this dependence to produce continuing capability gains, using subsequent tasks to distinguish useful improvement from an echo chamber.",
        "body": [
          {
            "heading": "How an echo chamber forms",
            "text": "Suppose a robot only probes the ground with a small force. Several contact models predict similar outcomes under those conditions; a different action would reveal their disagreement. If the robot keeps repeating the same actions, its current explanation can keep finding support while alternatives remain untested."
          },
          {
            "heading": "Separate “not yet learned” from “not expressible yet”",
            "text": "What improves through further training with the same inputs and structure has not yet been learned. Missing contact information or an inexpressible relationship calls for new observations, representations, or model structure. RSI asks the system to choose what to learn next and when to change what it can learn."
          },
          {
            "heading": "Act to obtain distinguishing evidence",
            "text": "When friction and load changes both explain past experience, choose an action for which the explanations predict different outcomes, then observe the response. Dual control considers both completing the current task and obtaining useful information, allowing an action to improve future learning."
          },
          {
            "heading": "Test improvement on new experience",
            "text": "Test the revised system on actions and situations that did not enter training: are its predictions better, its action choices more useful, and its previous abilities retained? Use the results to choose the next data, model updates, and representation changes. Improvement then changes how the next round of learning proceeds."
          }
        ],
        "takeaway": "RSI asks how useful capabilities can grow. An echo chamber can mistake increasingly concentrated belief for increasingly complete understanding.",
        "bridge": "Body motion, tool use, and interaction with other agents all require predictions to be tested against actual outcomes. New experience is followed by checks on later actions across all three kinds of task.",
        "details": [
          {
            "title": "Three sources of prediction error",
            "text": "First fix the prediction task and the information available for it, such as predicting the next body movement from an observation history. \\(L_t\\) is the current system’s average prediction error. \\(H\\) is error that remains even with full use of that information; \\(\\Delta_t\\) comes from what the current input processing and model structure cannot express; \\(G_t\\) comes from what those models could learn but have not yet learned.\n\\[L_t=H+\\Delta_t+G_t.\\]\nFurther training tries to reduce the unlearned part. Useful new information or expressive capacity may reduce the inexpressible part. The decomposition distinguishes questions; a training curve alone does not identify the three quantities."
          },
          {
            "title": "Defining the best achievable error",
            "text": "Let \\(X\\) contain all information agreed in advance, \\(Y\\) be the common prediction target, and \\(\\ell\\) measure prediction error. Keep evaluation situations and the error measure fixed across versions. \\(\\mathcal F\\) contains all allowed predictors based on \\(X\\); \\(\\mathcal F_t\\) contains predictors allowed by the current input interface and model structure; \\(f_t\\) is the predictor already learned.\n\\[R(f)=\\mathbb E[\\ell(f(X),Y)],\\qquad f_t\\in\\mathcal F_t\\subseteq\\mathcal F.\\]\n\\[\\begin{aligned}H&=\\inf_{f\\in\\mathcal F}R(f),&B_t&=\\inf_{f\\in\\mathcal F_t}R(f),\\\\L_t&=R(f_t),&\\Delta_t&=B_t-H,\\qquad G_t=L_t-B_t.\\end{aligned}\\]\n\\(\\inf\\) denotes the lowest average error that can be approached. \\(B_t\\) is the best achievable level within the current model class; \\(H\\) additionally allows all agreed information and predictors. For a before/after touch comparison, \\(X\\) can include tactile recordings throughout while the earlier model uses only body observations. The benefit of adding touch can then enter \\(\\Delta_t\\) without changing the evaluation baseline."
          },
          {
            "title": "Testing active learning",
            "text": "Compare repeated task actions, random exploration, fixed probes, and actively chosen probes. Track the interactions needed to distinguish models and performance on new actions, changing environments, and returning environments. Persistent excitation concerns whether actions provide enough identification information; experiments also record their task cost."
          }
        ]
      }
    ]
  }
};

export const progressBar = (total: number, current: number) => {
  const width = 30; // Largura da barra de progresso
  const progress = Math.round((current / total) * width);
  const percent = Math.round((current / total) * 100);

  console.log(`${percent}% (${current}/${total})`);
};

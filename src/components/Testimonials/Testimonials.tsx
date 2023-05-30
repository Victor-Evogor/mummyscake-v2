import { Card, Typography, Grid, Stack, Avatar } from "@mui/material";
import { Container } from "@mui/system";
import { faker } from "@faker-js/faker";

const Testimonial = ({ testimonial }: { testimonial: string }) => {
  return (
    <Grid item md={4}>
      <Card sx={{ minWidth: 275, height: 200, py: 2, px: 2 }}>
        <Stack
          direction={"column"}
          justifyContent={"space-between"}
          height="100%"
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {testimonial}
          </Typography>

          <Stack direction={"row"} spacing={1}>
            <Avatar src={faker.image.avatar()} alt="" />
            <Stack direction={"column"}>
              <Typography>{faker.name.fullName()}</Typography>
              <Typography variant="caption">
                Works at {faker.company.name()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};

export const Testimonials = () => {
  const testimonials = [
    "I ordered a cake for my friend's birthday from this website and was blown away by the quality of the cake and the on-time delivery. Highly recommend!",
    "I have been using this cake delivery website for a while now, and I must say I am thoroughly impressed. The cakes are always fresh, and the delivery is prompt. Will definitely continue using their services.",
    "I was hesitant to order a cake online, but this website exceeded my expectations. The cake was delicious, and the delivery was hassle-free. I will definitely be ordering from them again!",
  ];

  return (
    <Container>
      <Typography
        variant="h3"
        textAlign="center"
        textTransform="capitalize"
        my={2}
      >
        what people are saying
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
        }}
      >
        {testimonials.map((testimonial, i) => (
          <Testimonial key={i} testimonial={testimonial} />
        ))}
      </Grid>
    </Container>
  );
};
